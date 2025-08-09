# 🎤 Demo web thu âm bằng **MediaRecorder API** + Backend Node.js lưu file.

## 🚀 Demo
- **Frontend**: [[Render](https://<username>.github.io/audio-recorder-portfolio/frontend/)](https://mediarecorder-api-demo.onrender.com/)
- **Backend API**: [[Render](https://audio-recorder-backend.onrender.com)](https://mediarecorder-api-demo.onrender.com/list-uploads)

- > 💡 Bạn có thể mở link frontend, thử ghi âm và gửi API để thấy file được lưu trên server.
- >📌 Tính năng chính
🎙 Thu âm giọng nói bằng MediaRecorder API

💾 Tải file về máy (format .webm)

📤 Gửi file lên server qua API

📂 Lưu file trên backend và truy cập qua URL

🌍 Chạy được cả local và online

## 🛠 Công nghệ sử dụng
### **Frontend**
- HTML5, CSS3, JavaScript (Vanilla JS)
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) để ghi âm
- Fetch API để gửi dữ liệu tới backend

### **Backend**
- Node.js + Express
- Multer (xử lý upload file)
- CORS (cho phép cross-domain request)
- Render (triển khai backend)

## 📂 Cấu trúc dự án

```
api-media-recorder/
│
├── audio-recorder-backend/
│ ├── server.js # Code Node.js backend
│ ├── package.json
│ ├── uploads/ # Thư mục lưu file âm thanh
│
├── frontend/
│ └── audio-recorder.html # Giao diện web thu âm
│
└── README.md
```


## 🖥 Cài đặt & Chạy Local

```
cd audio-recorder-backend
npm install
npm start

📧 Liên hệ
Trịnh Tuấn Tú
📞 0962 920 750
📧 tuantutrinh2003@gmail.com
