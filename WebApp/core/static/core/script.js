const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const transcriptionBox = document.getElementById("transcription");
const statusEl = document.getElementById("status");
const sentimentBox = document.getElementById("sentimentAnalysis");

let mediaRecorder;
let audioChunks = [];
let isRecording = false;

function getCSRFToken() {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return cookieValue ? cookieValue.split("=")[1] : "";
}

startBtn.addEventListener("click", async () => {
  try {
    // Reset the transcription area if starting a new recording
    transcriptionBox.innerHTML = '<p class="text-gray-500">Recording in progress...</p>';
    transcriptionBox.classList.remove("hidden");
    audioChunks = [];

    // Check for browser support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showError("Media recording not supported in this browser. Please try Chrome, Edge, or Safari.");
      return;
    }

    // Get access to the microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Create a new MediaRecorder instance
    mediaRecorder = new MediaRecorder(stream);
    
    // Update UI for recording state
    setRecordingState(true);

    // Event handler for when data is available
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    // Event handler for when recording stops
    mediaRecorder.onstop = async () => {
      // Create a blob from the audio chunks
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      
      // Update status
      updateStatus("processing", "Processing audio...");
      
      // Create a FormData object to send the audio file
      const formData = new FormData();
      formData.append("audio_file", audioBlob, "recording.webm");
      
      try {
        // Send the audio to the backend for Whisper API transcription
        const response = await fetch("/api/transcribe-audio/", {
          method: "POST",
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          showError(`Transcription error: ${data.error}`);
          return;
        }
        
        // Display the transcription
        displayTranscription(data.transcription);
        
        // Now that we have the transcription, send it for sentiment analysis
        if (data.transcription.trim()) {
          updateStatus("analyzing", "Analyzing sentiment...");
          await analyzeSentiment(data.transcription);
        }
      } catch (error) {
        console.error("Error processing audio:", error);
        showError(`Error: ${error.message}`);
      }
    };

    // Start recording
    mediaRecorder.start();
    console.log("Recording started");

  } catch (err) {
    console.error(err);
    showError(`Error: ${err.message}`);
    setRecordingState(false);
  }
});

stopBtn.addEventListener("click", () => {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stop();
    setRecordingState(false);
    updateStatus("success", "Recording completed");
    
    // Stop all audio tracks to release the microphone
    if (mediaRecorder.stream) {
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  }
});

function setRecordingState(isActive) {
  isRecording = isActive;
  
  // Update button states
  startBtn.disabled = isActive;
  startBtn.classList.toggle("opacity-50", isActive);
  startBtn.classList.toggle("cursor-not-allowed", isActive);

  stopBtn.disabled = !isActive;
  stopBtn.classList.toggle("bg-gray-200", !isActive);
  stopBtn.classList.toggle("text-gray-400", !isActive);
  stopBtn.classList.toggle("cursor-not-allowed", !isActive);
  stopBtn.classList.toggle("bg-red-600", isActive);
  stopBtn.classList.toggle("hover:bg-red-700", isActive);
  stopBtn.classList.toggle("text-white", isActive);
  stopBtn.classList.toggle("shadow-md", isActive);

  // Show transcription area
  transcriptionBox.classList.remove("hidden");

  // Update status
  if (isActive) {
    updateStatus("recording", "Recording...");
  } else {
    updateStatus("ready", "Ready to record");
  }
}

function updateStatus(state, message) {
  let indicator, classes;

  switch (state) {
    case "recording":
      indicator = '<span class="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>';
      classes = "text-red-700";
      break;
    case "processing":
      indicator = '<span class="w-2 h-2 rounded-full bg-yellow-500 mr-2 animate-pulse"></span>';
      classes = "text-yellow-700";
      break;
    case "analyzing":
      indicator = '<span class="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>';
      classes = "text-blue-700";
      break;
    case "success":
      indicator = '<span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>';
      classes = "text-green-700 bg-green-50 transition-all duration-500";
      break;
    case "ready":
      indicator = '<span class="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>';
      classes = "text-blue-700";
      break;
    case "warning":
      indicator = '<span class="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>';
      classes = "text-yellow-700";
      break;
    case "error":
      indicator = '<span class="w-2 h-2 rounded-full bg-red-500 mr-2"></span>';
      classes = "text-red-600";
      break;
  }

  statusEl.className = `flex items-center p-2 rounded ${classes}`;
  statusEl.innerHTML = `<div class="flex items-center">${indicator}${message}</div>`;
}

function showError(message) {
  updateStatus("error", message);
  console.error(message);
}

function displayTranscription(text) {
  if (!text || text.trim() === "") {
    transcriptionBox.innerHTML = '<p class="text-gray-500">No transcription available</p>';
    return;
  }
  
  // Format paragraphs
  const formattedText = text
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(line => `<p class="mb-2">${line}</p>`)
    .join("");
  
  transcriptionBox.innerHTML = `
    <div class="text-sm font-medium text-primary-700 mb-2">Transcription:</div>
    <div class="text-gray-800">${formattedText}</div>
  `;
  
  // Add a transition effect
  transcriptionBox.classList.add("bg-blue-50", "border-blue-200");
  setTimeout(() => {
    transcriptionBox.classList.remove("bg-blue-50", "border-blue-200");
  }, 1000);
  
  // Scroll to the bottom for new content
  transcriptionBox.scrollTop = transcriptionBox.scrollHeight;
}

async function analyzeSentiment(text) {
  try {
    const response = await fetch("/api/analyze-sentiment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken()
      },
      body: JSON.stringify({
        text: text
      })
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    // Display sentiment analysis results
    if (sentimentBox) {
      displaySentimentAnalysis(data);
    }
    
    updateStatus("success", "Analysis complete");
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    showError(`Sentiment analysis error: ${error.message}`);
  }
}

function displaySentimentAnalysis(data) {
  if (!data || !sentimentBox) return;
  
  // Get the sentiment score and determine the color
  const sentiment = data.sentiment || {};
  const score = sentiment.score || 0;
  
  let sentimentClass, sentimentText;
  
  if (score > 0.25) {
    sentimentClass = "bg-green-100 border-green-300 text-green-800";
    sentimentText = "Positive";
  } else if (score < -0.25) {
    sentimentClass = "bg-red-100 border-red-300 text-red-800";
    sentimentText = "Negative";
  } else {
    sentimentClass = "bg-gray-100 border-gray-300 text-gray-800";
    sentimentText = "Neutral";
  }
  
  // Format the sentiment display
  sentimentBox.innerHTML = `
    <div class="text-sm font-medium text-primary-700 mb-2">Sentiment Analysis:</div>
    <div class="p-3 rounded-lg ${sentimentClass} mb-3">
      <div class="font-medium">${sentimentText} (${(score * 100).toFixed(1)}%)</div>
      ${data.analysis ? `<p class="text-sm mt-1">${data.analysis}</p>` : ''}
    </div>
  `;
  
  sentimentBox.classList.remove("hidden");
}