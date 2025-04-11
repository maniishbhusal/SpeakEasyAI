navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    console.log("Microphone permission granted");
    stream.getTracks().forEach((track) => track.stop());
  })
  .catch((error) => {
    console.error("Microphone permission denied", error);
  });
