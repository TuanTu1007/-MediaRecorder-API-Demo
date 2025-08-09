// globals.js
export const state = {
  mediaRecorder: null,
  audioChunks: [],
  audioBlob: null,
  audioUrl: null,
  audioContext: null,
  analyser: null,
  sourceNode: null,
  dataArray: null,
  animationId: null,
  seconds: 0,
  timerInterval: null,
  recordings: [],
};

export const audioPlayer = document.getElementById('audioPlayer');
export const startBtn = document.getElementById('startBtn');
export const stopBtn = document.getElementById('stopBtn');
export const downloadBtn = document.getElementById('downloadBtn');
export const uploadBtn = document.getElementById('uploadBtn');
export const statusDiv = document.getElementById('status');
export const timerDisplay = document.getElementById('timer');
export const qualitySelect = document.getElementById('qualitySelect');
export const recordingsList = document.getElementById('recordingsList');
export const waveformCanvas = document.getElementById('waveform');
export const canvasCtx = waveformCanvas.getContext('2d');

export function getExtensionByMimeType(mime) {
  switch (mime) {
    case 'audio/webm':
    case 'audio/webm;codecs=opus':
      return 'webm';
    case 'audio/wav':
      return 'wav';
    case 'audio/mpeg':
      return 'mp3';
    default:
      return 'wav';
  }
}
