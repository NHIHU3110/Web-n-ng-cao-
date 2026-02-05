# 📁 File Upload Server - Hướng dẫn sử dụng

## 📌 Thông tin cơ bản
- **Tên project:** my-server-uploadfile
- **Port:** 3001
- **Công nghệ:** Node.js + Express

---

## 🚀 Cách chạy server

### Bước 1: Mở Terminal
```bash
cd "/Users/huynhthaonhi/Documents/Huynh Thao Nhi/K234111441/my-server-uploadfile"
```

### Bước 2: Chạy server
```bash
npm start
```

### Bước 3: Mở trình duyệt, vào:
```
http://localhost:3001/index.html
```

---

## 📂 Cấu trúc thư mục

```
my-server-uploadfile/
├── public/              # Chứa file HTML
│   └── index.html      # Form upload
├── upload/             # Thư mục lưu file đã upload
├── index.js            # File chính của server
├── package.json        # Dependencies
└── README.md           # File này
```

---

## 🔗 API Endpoints

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `http://localhost:3001/` | GET | Trang chủ (form upload) |
| `http://localhost:3001/upload` | POST | Upload file |
| `http://localhost:3001/upload/[filename]` | GET | Xem file đã upload |

---

## 📸 Cách upload file

1. Vào `http://localhost:3001/index.html`
2. Click nút **"Choose File"**
3. Chọn file ảnh
4. Click nút **"Upload"**
5. File sẽ được lưu vào thư mục `upload/`

---

## 🛠 Test bằng Postman

**Upload file:**
- Method: `POST`
- URL: `http://localhost:3001/upload`
- Body: form-data
  - Key: `image` (type: File)
  - Value: Chọn file từ máy

---

## ⚠️ Lưu ý quan trọng

- Server phải chạy trước khi mở trang web
- Port mặc định: **3001**
- File upload có giới hạn dung lượng: **10MB**
- Tên field upload phải là **"image"**

---

## 🔄 Khởi động lại server

Nếu sửa code, cần restart server:
1. Nhấn `Ctrl + C` trong terminal
2. Gõ lại `npm start`

---

**Được tạo bởi:** Exercise 48 - Advanced Web Development
**Ngày tạo:** 2026-02-05
