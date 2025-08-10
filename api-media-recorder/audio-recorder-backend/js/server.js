const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Tạo thư mục uploads nếu chưa có
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Cấu hình multer để lưu file vào uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".webm";
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Route upload
app.post("/upload", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "Upload thành công!",
    fileName: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

// Cho phép truy cập file đã upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

// Server frontend
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/audio-recorder.html"));
});

app.get("/list-uploads", (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send("Lỗi đọc thư mục uploads");
    }

    let html = `
      <h2>Danh sách file âm thanh đã được gửi</h2>
      <ul>
    `;

    files.forEach(file => {
      // Tạo link để tải/nghe file
      html += `<li><a href="/uploads/${encodeURIComponent(file)}" target="_blank">${file}</a></li>`;
    });

    html += '</ul>';

    res.send(html);
  });
});