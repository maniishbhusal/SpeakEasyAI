const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const transcriptionBox = document.getElementById('transcription');
const statusEl = document.getElementById('status');

let recognition;
let isRecording = false;
let finalTranscript = '';

startBtn.addEventListener('click', async () => {
    try {
        // Check for browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            showError("Speech Recognition not supported in this browser. Please try Chrome, Edge, or Safari.");
            return;
        }

        // Setup recognition
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        // Update UI for recording state
        setRecordingState(true);

        recognition.onstart = () => {
            console.log("Speech recognition started");
            isRecording = true;
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                const confidence = event.results[i][0].confidence;
                
                if (event.results[i].isFinal) {
                    // Add confidence indicator for final results
                    const confidenceLevel = getConfidenceLevel(confidence);
                    const confidenceIndicator = `<span class="confidence-${confidenceLevel}"></span>`;
                    
                    finalTranscript += `<div class="transcription-entry">
                        ${confidenceIndicator}
                        <span class="transcript-text">${transcript}</span>
                    </div>`;
                    
                    console.log(`✅ Final (${Math.round(confidence * 100)}%):`, transcript);
                } else {
                    interimTranscript = transcript;
                }
            }
            
            updateTranscriptionDisplay(interimTranscript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            
            if (event.error === 'no-speech') {
                updateStatus('warning', 'No speech detected. Please speak now.');
            } else if (event.error === 'audio-capture') {
                showError("Microphone not found or not working properly.");
            } else if (event.error === 'not-allowed') {
                showError("Microphone permission denied. Please allow microphone access.");
            } else {
                showError(`Error: ${event.error}`);
            }
        };

        recognition.onend = () => {
            console.log("Speech recognition ended");
            
            // Only reset if we're not intentionally stopping
            if (isRecording) {
                console.log("Attempting to restart recognition...");
                try {
                    // Auto-restart if it stopped unexpectedly
                    recognition.start();
                    updateStatus('recording', 'Recording resumed');
                    setTimeout(() => {
                        if (isRecording) {
                            updateStatus('recording', 'Recording...');
                        }
                    }, 1500);
                } catch (e) {
                    console.error("Could not restart recognition:", e);
                    setRecordingState(false);
                    showError("Recording stopped unexpectedly. Please restart.");
                }
            }
        };

        recognition.start();

        // Stop logic
        stopBtn.addEventListener('click', stopRecording, { once: true });

    } catch (err) {
        console.error(err);
        showError(`Error: ${err.message}`);
    }
});

function stopRecording() {
    if (!recognition) return;
    
    isRecording = false;
    recognition.stop();
    setRecordingState(false);
    
    updateStatus('success', 'Recording completed');
    
    // Save transcription indicator
    if (finalTranscript) {
        transcriptionBox.classList.add('saved');
        setTimeout(() => transcriptionBox.classList.remove('saved'), 1000);
    }
    
    // Reset stopBtn event listener for next use
    stopBtn.removeEventListener('click', stopRecording);
}

function setRecordingState(isActive) {
    // Update button states
    startBtn.disabled = isActive;
    startBtn.classList.toggle('opacity-50', isActive);
    startBtn.classList.toggle('cursor-not-allowed', isActive);
    
    stopBtn.disabled = !isActive;
    stopBtn.classList.toggle('bg-gray-200', !isActive);
    stopBtn.classList.toggle('text-gray-400', !isActive);
    stopBtn.classList.toggle('cursor-not-allowed', !isActive);
    stopBtn.classList.toggle('bg-red-600', isActive);
    stopBtn.classList.toggle('hover:bg-red-700', isActive);
    stopBtn.classList.toggle('text-white', isActive);
    stopBtn.classList.toggle('shadow-md', isActive);
    
    // Show transcription area
    transcriptionBox.classList.remove('hidden');
    
    // Update status
    if (isActive) {
        updateStatus('recording', 'Recording...');
    } else {
        updateStatus('ready', 'Ready to record');
    }
}

function updateStatus(state, message) {
    let indicator, classes;
    
    switch (state) {
        case 'recording':
            indicator = '<span class="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>';
            classes = 'text-red-700';
            break;
        case 'success':
            indicator = '<span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>';
            classes = 'text-green-700 bg-green-50 transition-all duration-500';
            break;
        case 'ready':
            indicator = '<span class="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>';
            classes = 'text-blue-700';
            break;
        case 'warning':
            indicator = '<span class="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>';
            classes = 'text-yellow-700';
            break;
        case 'error':
            indicator = '<span class="w-2 h-2 rounded-full bg-red-500 mr-2"></span>';
            classes = 'text-red-600';
            break;
    }
    
    statusEl.className = `flex items-center p-2 rounded ${classes}`;
    statusEl.innerHTML = `<div class="flex items-center">${indicator}${message}</div>`;
}

function showError(message) {
    updateStatus('error', message);
    console.error(message);
}

function getConfidenceLevel(confidence) {
    if (confidence > 0.9) return 'high';
    if (confidence > 0.7) return 'medium';
    return 'low';
}

function updateTranscriptionDisplay(interimText) {
    // Create a container for better organization
    let content = '';
    
    // Add the interim transcript if available
    if (interimText) {
        content += `
            <div class="interim-container p-2 mb-3 bg-blue-50 border-l-2 border-blue-300 rounded">
                <div class="text-sm text-blue-500 mb-1">Listening now...</div>
                <div class="text-gray-700 italic">${interimText}</div>
            </div>
        `;
    }
    
    // Add the final transcript
    content += `
        <div class="final-transcript">
            ${finalTranscript || '<p class="text-gray-500">No transcription yet</p>'}
        </div>
    `;
    
    transcriptionBox.innerHTML = content;
    
    // Scroll to the bottom for new content
    transcriptionBox.scrollTop = transcriptionBox.scrollHeight;
}