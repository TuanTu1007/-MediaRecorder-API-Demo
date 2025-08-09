document.getElementById("downloadBtn").addEventListener("click", () => {
  if (!audioBlob) return;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(audioBlob);
  a.download = "recorded-audio.webm";
  a.click();
});
