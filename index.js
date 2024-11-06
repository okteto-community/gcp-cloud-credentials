// Import the Google Cloud Storage library
const { Storage } = require('@google-cloud/storage');

// Create a Google Cloud Storage client
const storage = new Storage();

// Define your bucket name and the file name you want to create
const bucketName = process.env.BUCKET_NAME;

if (!bucketName) {
    console.error("Error: BUCKET_NAME environment variable is not set.");
    process.exit(1);
  }
  
const filename = 'example.txt';

// Function to save text to Google Cloud Storage
async function uploadTextToGCS() {
  try {
    // Specify the text content to save
    const content = 'This is the content of the file to save in Google Cloud Storage.';

    // Define the file options for creating the text file in the bucket
    const file = storage.bucket(bucketName).file(filename);

    // Upload the content directly to the file in Google Cloud Storage
    await file.save(content, {
      resumable: false, // Optional: use true for large files to enable resumable uploads
      metadata: {
        contentType: 'text/plain', // Specify content type
      },
    });

    console.log(`${filename} uploaded to ${bucketName}`);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// Call the function to upload the text to GCS
uploadTextToGCS();
