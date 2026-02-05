const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'upload');

console.log("Checking directory:", uploadDir);

if (!fs.existsSync(uploadDir)) {
    console.log("Directory does not exist.");
    process.exit(1);
}

fs.readdir(uploadDir, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        process.exit(1);
    }

    console.log("Files found:", files);

    const fileList = files.map(file => {
        const filePath = path.join(uploadDir, file);
        console.log("Checking file:", filePath);
        try {
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                console.log(" - Is directory, skipping");
                return null;
            }
            console.log(" - OK");
            return {
                filename: file,
                size: stats.size,
                uploadDate: stats.mtime
            };
        } catch (e) {
            console.error(" - Error accessing file:", e.message);
            return null;
        }
    }).filter(item => item !== null);

    console.log("Final list:", fileList);
});
