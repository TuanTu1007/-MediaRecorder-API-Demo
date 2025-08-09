// download.js
import { state, getExtensionByMimeType } from './globals.js';

export function downloadCurrentRecording() {
  if (!state.audioBlob) return;

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = state.audioUrl;
  a.download = `recording_${new Date().toISOString().replace(/[:.]/g, '-')}.${getExtensionByMimeType(state.audioBlob.type)}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Nếu bạn dùng nút download chính, bind event
export function bindDownloadButton(downloadBtn) {
  downloadBtn.onclick = downloadCurrentRecording;
}
