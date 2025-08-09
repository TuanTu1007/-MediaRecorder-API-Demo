// recorder.js
import {
  state,
  audioPlayer, startBtn, stopBtn, downloadBtn, uploadBtn,
  statusDiv, timerDisplay, qualitySelect,
  waveformCanvas, canvasCtx,
  getExtensionByMimeType
} from './globals.js';

import { addRecordingToList } from './list.js'; // nếu bạn tách list.js

export function updateTimer() {
  state.seconds++;
  let mins = Math.floor(state.seconds / 60).toString().padStart(2, '0');
  let secs = (state.seconds % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${mins}:${secs}`;
}

export function resetTimer() {
  clearInterval(state.timerInterval);
  state.seconds = 0;
  timerDisplay.textContent = '00:00';
}

export function initVisualizer(stream) {
  state.audioContext = new AudioContext();
  state.analyser = state.audioContext.createAnalyser();
  state.sourceNode = state.audioContext.createMediaStreamSource(stream);
  state.sourceNode.connect(state.analyser);
  state.analyser.fftSize = 2048;
  let bufferLength = state.analyser.frequencyBinCount;
  state.dataArray = new Uint8Array(bufferLength);
  drawWaveform();
}

export function drawWaveform() {
  state.animationId = requestAnimationFrame(drawWaveform);

  state.analyser.getByteTimeDomainData(state.dataArray);

  canvasCtx.fillStyle = '#222';
  canvasCtx.fillRect(0, 0, waveformCanvas.width, waveformCanvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = '#4caf50';

  canvasCtx.beginPath();

  let sliceWidth = waveformCanvas.width * 1.0 / state.dataArray.length;
  let x = 0;

  for (let i = 0; i < state.dataArray.length; i++) {
    let v = state.dataArray[i] / 128.0;
    let y = v * waveformCanvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(waveformCanvas.width, waveformCanvas.height / 2);
  canvasCtx.stroke();
}

export function stopVisualizer() {
  cancelAnimationFrame(state.animationId);
  if (state.audioContext) {
    state.audioContext.close();
  }
  canvasCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
}

export function resizeCanvas() {
  waveformCanvas.width = waveformCanvas.clientWidth;
  waveformCanvas.height = waveformCanvas.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

export async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    resetTimer();
    state.timerInterval = setInterval(updateTimer, 1000);

    let selectedType = qualitySelect.value;
    if (!MediaRecorder.isTypeSupported(selectedType)) {
      statusDiv.textContent = `Định dạng ${selectedType} không được hỗ trợ, dùng mặc định WebM.`;
      selectedType = 'audio/webm;codecs=opus';
    }
    state.mediaRecorder = new MediaRecorder(stream, { mimeType: selectedType });

    state.audioChunks = [];
    state.mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) state.audioChunks.push(e.data);
    };

    state.mediaRecorder.onstart = () => {
      statusDiv.textContent = 'Đang ghi âm...';
      startBtn.disabled = true;
      stopBtn.disabled = false;
      downloadBtn.disabled = true;
      uploadBtn.disabled = true;
      audioPlayer.src = '';
      initVisualizer(stream);
    };

    state.mediaRecorder.onstop = () => {
      state.audioBlob = new Blob(state.audioChunks, { type: state.mediaRecorder.mimeType });
      state.audioUrl = URL.createObjectURL(state.audioBlob);
      audioPlayer.src = state.audioUrl;
      statusDiv.textContent = 'Đã dừng ghi âm.';
      startBtn.disabled = false;
      stopBtn.disabled = true;
      downloadBtn.disabled = false;
      uploadBtn.disabled = false;
      clearInterval(state.timerInterval);
      stopVisualizer();

      addRecordingToList(state.audioBlob);
    };

    state.mediaRecorder.start();
  } catch (err) {
    statusDiv.textContent = 'Lỗi khi lấy microphone hoặc không được phép: ' + err.message;
  }
}

export function stopRecording() {
  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
    state.mediaRecorder.stop();
  }
}
