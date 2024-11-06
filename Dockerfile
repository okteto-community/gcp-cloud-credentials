# Use an official Node.js runtime as the base image
FROM node:18

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Set environment variables for Google Cloud authentication
# (Optional: uncomment if setting the GOOGLE_APPLICATION_CREDENTIALS file)
# COPY path/to/your-service-account-file.json /usr/src/app/service-account.json
# ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/service-account.json"

# Start the application
CMD ["node", "index.js"]
