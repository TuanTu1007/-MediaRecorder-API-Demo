// upload.js
import { state, statusDiv, getExtensionByMimeType } from './globals.js';

export function uploadCurrentRecording() {
  if (!state.audioBlob) return;
  statusDiv.textContent = 'Đang gửi...';

  const formData = new FormData();
  formData.append(
    'file',
    state.audioBlob,
    `recording_${new Date().toISOString().replace(/[:.]/g, '-')}.${getExtensionByMimeType(state.audioBlob.type)}`
  );

  fetch('https://your-api-endpoint/upload', {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      if (res.ok) {
        statusDiv.textContent = 'Gửi thành công!';
      } else {
        statusDiv.textContent = 'Gửi thất bại: ' + res.statusText;
      }
    })
    .catch(err => {
      statusDiv.textContent = 'Lỗi gửi API: ' + err.message;
    });
}

// Nếu bạn dùng nút upload chính, bind event
export function bindUploadButton(uploadBtn) {
  uploadBtn.onclick = uploadCurrentRecording;
}
