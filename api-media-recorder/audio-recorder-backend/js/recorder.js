document.getElementById("startBtn").addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = event => {
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const audioUrl = URL.createObjectURL(audioBlob);
    document.getElementById("audioPlayer").src = audioUrl;
    document.getElementById("downloadBtn").disabled = false;
    document.getElementById("uploadBtn").disabled = false;
  };

  mediaRecorder.start();
  document.getElementById("status").textContent = "⏺ Đang ghi âm...";
  document.getElementById("startBtn").disabled = true;
  document.getElementById("stopBtn").disabled = false;
});

document.getElementById("stopBtn").addEventListener("click", () => {
  mediaRecorder.stop();
  document.getElementById("status").textContent = "✅ Đã ghi âm xong";
  document.getElementById("startBtn").disabled = false;
  document.getElementById("stopBtn").disabled = true;
});
