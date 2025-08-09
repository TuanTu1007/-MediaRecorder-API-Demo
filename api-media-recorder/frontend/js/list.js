// list.js
import { state, recordingsList, statusDiv, getExtensionByMimeType } from './globals.js';

export function addRecordingToList(blob) {
  const id = Date.now();
  const url = URL.createObjectURL(blob);
  state.recordings.push({ id, blob, url });
  renderRecordingsList();
}

export function renderRecordingsList() {
  recordingsList.innerHTML = '';
  state.recordings.forEach(rec => {
    const div = document.createElement('div');
    div.className = 'recording-item';

    const audioEl = document.createElement('audio');
    audioEl.controls = true;
    audioEl.src = rec.url;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'recording-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Xóa';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
      URL.revokeObjectURL(rec.url);
      state.recordings = state.recordings.filter(r => r.id !== rec.id);
      renderRecordingsList();
    };

    const uploadBtn = document.createElement('button');
    uploadBtn.textContent = 'Gửi API';
    uploadBtn.className = 'upload-btn';
    uploadBtn.onclick = () => {
      uploadRecording(rec);
    };

    actionsDiv.appendChild(uploadBtn);
    actionsDiv.appendChild(deleteBtn);

    div.appendChild(audioEl);
    div.appendChild(actionsDiv);

    recordingsList.appendChild(div);
  });
}

export function uploadRecording(recording) {
  statusDiv.textContent = `Đang gửi bản ghi ${new Date(recording.id).toLocaleTimeString()}...`;

  const formData = new FormData();
  formData.append(
    'file',
    recording.blob,
    `recording_${new Date(recording.id).toISOString().replace(/[:.]/g, '-')}.${getExtensionByMimeType(recording.blob.type)}`
  );

  fetch('https://your-api-endpoint/upload', {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      if (res.ok) {
        statusDiv.textContent = 'Gửi thành công bản ghi!';
      } else {
        statusDiv.textContent = 'Gửi thất bại: ' + res.statusText;
      }
    })
    .catch(err => {
      statusDiv.textContent = 'Lỗi gửi API: ' + err.message;
    });
}
