const express = require('express');
const { Storage } = require('@google-cloud/storage');
const bodyParser = require('body-parser');

const app = express();
const storage = new Storage();

app.use(bodyParser.urlencoded({ extended: true }));

// Define your bucket name and the file name you want to create
const bucketName = process.env.BUCKET_NAME;

if (!bucketName) {
    console.error("Error: BUCKET_NAME environment variable is not set.");
    process.exit(1);
}

app.get('/', (req, res) => {
    res.send(`
        <h1>Upload Text to Google Cloud Storage</h1>
        <form action="/upload" method="POST">
            <label for="filename">File Name:</label>
            <input type="text" id="filename" name="filename" required><br><br>
            
            <label for="content">File Content:</label><br>
            <textarea id="content" name="content" rows="10" cols="30" required></textarea><br><br>
            
            <button type="submit">Save to GCP Bucket</button>
        </form>
    `);
});

app.post('/upload', async (req, res) => {
    const { filename, content } = req.body;

    if (!filename || !content) {
        return res.status(400).send('File name and content are required.');
    }

    try {
        const file = storage.bucket(bucketName).file(filename);

        await file.save(content, {
            resumable: false, 
            metadata: {
                contentType: 'text/plain',
            },
        });

        res.send(`File "${filename}" successfully uploaded to bucket "${bucketName}".`);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('An error occurred while uploading the file.');
    }
});


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});