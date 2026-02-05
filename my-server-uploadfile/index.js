const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3001;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
        createParentPath: true,
    })
);

// Serve static files
app.use(express.static('public'));
app.use('/upload', express.static('upload'));

// API: Get server info
app.get('/api/info', (req, res) => {
    res.json({
        serverName: 'Premium File Upload Server',
        version: '2.0.0',
        port: port,
        endpoints: {
            uploadFile: 'POST /upload',
            listFiles: 'GET /api/files',
            deleteFile: 'DELETE /api/files/:filename',
            serverInfo: 'GET /api/info'
        }
    });
});

// API: List all uploaded files with metadata
app.get('/api/files', (req, res) => {
    const uploadDir = path.join(__dirname, 'upload');

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error("Error reading upload directory:", err);
            return res.status(500).json({ error: 'Unable to read upload directory', details: err.message });
        }

        const fileList = files.map(file => {
            const filePath = path.join(uploadDir, file);
            // Skip if it's not a file or if stat fails
            try {
                const stats = fs.statSync(filePath);
                if (stats.isDirectory()) return null;

                return {
                    filename: file,
                    size: stats.size,
                    uploadDate: stats.mtime,
                    url: `http://localhost:${port}/image/${file}`
                };
            } catch (e) {
                return null;
            }
        }).filter(item => item !== null); // Remove nulls

        res.json({
            totalFiles: fileList.length,
            files: fileList
        });
    });
});

// Serve specific image by ID (filename) as per Exercise 49
app.get("/image/:id", (req, res) => {
    const id = req.params["id"];
    const imagePath = path.join(__dirname, 'upload', id);

    console.log('Serving image:', id);

    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                if (!res.headersSent) {
                    res.status(500).send("Error sending file");
                }
            }
        });
    } else {
        res.status(404).send('Image not found');
    }
});

// API: Delete a file
app.delete('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'upload', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    // Delete the file
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete file' });
        }

        res.json({
            success: true,
            message: `File ${filename} deleted successfully`
        });
    });
});

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Upload endpoint with enhanced response
app.post('/upload', (req, res) => {
    console.log("Upload request received");

    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("No files found in request");
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    // Get the file that was set to our field named "image"
    const { image } = req.files;
    console.log("File received:", image.name, "Size:", image.size, "Mime:", image.mimetype);

    // If no image submitted, exit
    if (!image) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadPath = path.join(__dirname, 'upload', image.name);

    // Move the uploaded image to our upload folder
    image.mv(uploadPath, (err) => {
        if (err) {
            console.error("Move error:", err);
            return res.status(500).json({ error: 'Failed to upload file', details: err.message });
        }

        console.log("File saved to:", uploadPath);

        // Return success with file info
        res.json({
            success: true,
            message: 'File uploaded successfully',
            file: {
                filename: image.name,
                size: image.size,
                mimetype: image.mimetype,
                url: `http://localhost:${port}/image/${image.name}`
            }
        });
    });
});

app.listen(port, '0.0.0.0', () => {
    const serverUrl = `http://localhost:${port}`;
    console.log('\n========================================');
    console.log('🚀 Premium File Upload Server is running!');
    console.log('========================================');
    console.log(`📁 Local:   ${serverUrl}`);
    console.log(`📄 Page:    ${serverUrl}/index.html`);
    console.log('========================================\n');
});
