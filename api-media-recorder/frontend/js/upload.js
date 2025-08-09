document.getElementById("uploadBtn").addEventListener("click", async () => {
  if (!audioBlob) return;

  const formData = new FormData();
  formData.append("audio", audioBlob, "recorded-audio.webm");

  document.getElementById("status").textContent = "📤 Đang gửi dữ liệu...";

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      document.getElementById("status").textContent = "✅ Gửi dữ liệu thành công!";
    } else {
      document.getElementById("status").textContent = "❌ Gửi thất bại!";
    }
  } catch (error) {
    document.getElementById("status").textContent = "⚠ Lỗi kết nối API!";
  }
});
