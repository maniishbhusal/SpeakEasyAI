const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const transcriptionBox = document.getElementById('transcription');
const statusEl = document.getElementById('status');
const statusIndicator = statusEl.querySelector('span');

startBtn.addEventListener('click', async () => {
    try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // UI Updates
        startBtn.disabled = true;
        startBtn.classList.add('opacity-50', 'cursor-not-allowed');
        stopBtn.disabled = false;
        
        // Update the stop button style
        stopBtn.classList.remove('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
        stopBtn.classList.add('bg-red-600', 'hover:bg-red-700', 'text-white', 'shadow-md', 'hover:shadow-lg');
        
        // Update the transcription box
        transcriptionBox.classList.remove('hidden');
        transcriptionBox.innerHTML = '<p class="text-gray-700">Listening...</p>';
        
        // Update status
        statusEl.innerHTML = `
            <div class="flex items-center">
                <span class="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                Recording...
            </div>
        `;
        
        // Mock transcription (every 2 seconds)
        const mockTranscript = [
            "Hello there!",
            "This is a simulated transcription.",
            "In a real app, this would be from the Whisper API.",
            "But for now, enjoy these placeholder messages!"
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            transcriptionBox.innerHTML += `<p class="mt-2 py-1 px-3 bg-primary-50 rounded-lg border-l-2 border-primary-300">${mockTranscript[i]}</p>`;
            transcriptionBox.scrollTop = transcriptionBox.scrollHeight;
            i = (i + 1) % mockTranscript.length;
        }, 2000);

        // Cleanup on stop
        stopBtn.addEventListener('click', () => {
            clearInterval(interval);
            stream.getTracks().forEach(track => track.stop());
            
            // Reset UI
            stopBtn.disabled = true;
            stopBtn.classList.remove('bg-red-600', 'hover:bg-red-700', 'text-white', 'shadow-md', 'hover:shadow-lg');
            stopBtn.classList.add('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
            
            startBtn.disabled = false;
            startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            
            // Update status
            statusEl.innerHTML = `
                <div class="flex items-center">
                    <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    Recording saved!
                </div>
            `;
            
            // Highlight the saved status with animation
            statusEl.classList.add('bg-green-50');
            setTimeout(() => {
                statusEl.classList.remove('bg-green-50');
                statusEl.innerHTML = `
                    <div class="flex items-center">
                        <span class="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                        Ready to record
                    </div>
                `;
            }, 2000);
            
        }, { once: true });

    } catch (err) {
        statusEl.innerHTML = `
            <div class="flex items-center text-red-500">
                <span class="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                Error: ${err.message}
            </div>
        `;
        console.error(err);
    }
});