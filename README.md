<!-- @format -->

# YouTube-like Video Streaming and Transcoding Platform

This project demonstrates a simplified version of YouTube’s core functionalities—video uploading, transcoding, and playback—using AWS services, Kafka for messaging, and Google OAuth for user authentication (SSO).

## Overview

- **Video Uploading & Transcoding:** Upload raw media files, store them securely on AWS S3, and then transcode them into multiple formats/bitrates.
- **Real-time Streaming:** Stream videos directly from S3 using secure, pre-signed URLs or existing YouTube links.
- **Google OAuth 2.0 (NextAuth):** Enables single sign-on using Google accounts, eliminating the need for repeated logins.
- **Kafka Messaging:** Decouples the upload and transcoding processes, allowing seamless and scalable communication between services.

## Key Features

1. **Video Streaming & Playback**

   - Play any YouTube URL or custom video source on the client.
   - Stream video from AWS S3 using pre-signed URLs for security.

2. **File Upload Service**

   - Accepts file uploads via multipart/form-data.
   - Stores uploaded media in AWS S3 for scalability and durability.
   - Tested with Postman for reliable file transfer and S3 integration.

3. **OAuth 2.0 with Google Sign-In**

   - Powered by NextAuth (Next.js/Node.js).
   - Manages client registration, token retrieval, and secure resource access.
   - Simplifies and secures authentication across multiple services.

4. **Kafka Integration**

   - The Upload Service acts as a **producer**, sending messages to Kafka about new uploads.
   - The Transcoder Service acts as a **consumer**, listening for new video messages, fetching from S3, transcoding, and re-uploading the processed videos.
   - Uses `kafkajs` for interacting with the Kafka broker (e.g., Aiven).

5. **Video Transcoding**

   - Converts raw media to various formats or bitrates.
   - Downloads from S3, processes (e.g., using FFmpeg), and re-uploads to S3.
   - Enables the foundation for adaptive bitrate streaming (HLS/DASH).

6. **Database & Metadata Management**
   - Stores video metadata in PostgreSQL using Prisma.
   - The **Watch Service** fetches video details (e.g., title, description, file URL).
   - A front-end client can then display a video gallery or catalog.

## Architecture Highlights

### Services

- **Upload Service**

  - Receives file chunks or entire files from the client.
  - Persists files to AWS S3 and notifies Kafka.
  - Stores metadata (title, description, etc.) in PostgreSQL via Prisma.

- **Transcoder Service**
  - Consumes Kafka messages about new uploads.
  - Retrieves the video from S3, transcodes it (locally or in the service), then re-uploads the processed file.
- **Watch Service**

  - Reads metadata from PostgreSQL.
  - Generates pre-signed URLs for streaming from S3.
  - Delivers video details (title, description, author) to the front-end.

- **Client (Front-End)**
  - Built with Next.js / React.
  - Pages for:
    1. **Login** using NextAuth with Google OAuth.
    2. **Upload** with chunked or full-file uploads to the Upload Service.
    3. **Video Listing & Playback** that queries the Watch Service and streams videos.

### Authentication & Authorization

- **NextAuth** handles Google OAuth 2.0 flows.
- Restricts upload routes to authenticated users only.

### Kafka

- Deployed on Aiven or a local Kafka instance.
- Handles real-time messaging between the Upload Service (producer) and Transcoder Service (consumer).

### Observability

- **Grafana** integration planned for metrics like CPU usage, memory, and throughput (not fully implemented yet).

## Workflow Summary

1. **User Login**

   - User authenticates via Google OAuth (NextAuth).
   - Upon success, user gains secure access to protected resources.

2. **Video Upload**

   - Authenticated user selects a video file.
   - Front-end sends the file (multipart or chunked) to the Upload Service.
   - Upload Service writes the file to S3 and stores metadata in PostgreSQL.

3. **Kafka Notification**

   - Upload Service produces a Kafka message containing the video’s S3 location.
   - Transcoder Service listens (consumer) for new upload messages.

4. **Transcoding & Re-upload**

   - Transcoder Service downloads the raw file from S3.
   - Performs transcoding locally (using FFmpeg or similar).
   - Re-uploads the transcoded output to S3.

5. **Video Listing & Playback**
   - Watch Service queries PostgreSQL for available videos.
   - Front-end retrieves video metadata, then requests a pre-signed URL for playback.
   - Browser streams the video directly from S3.

## Technologies & Tools

- **Front-End:** Next.js, React, NextAuth (Google OAuth 2.0), Tailwind CSS, HTML5
- **Back-End Services:** Node.js, Express.js or Nest.js (optional)
- **AWS:** S3 for file storage, EC2 or Lambda if extended
- **Database:** PostgreSQL with Prisma ORM
- **Message Broker:** Kafka (using `kafkajs`), hosted on Aiven or locally
- **Authentication:** Google OAuth 2.0 via NextAuth
- **Docker:** (Optional) for containerizing services
- **Testing & Version Control:** GitHub and Postman

## Future Enhancements

- **Adaptive Bitrate Streaming (HLS/DASH)** for optimal playback on different network conditions.
- **Monitoring & Observability** with Grafana and Prometheus.
- **Elasticsearch Integration** for advanced metadata search (titles, tags, descriptions).
- **Automated CI/CD Pipelines** for streamlined deployments.
- **Serverless Functions (AWS Lambda)** for specific tasks or analytics.

## Getting Started (Basic Steps)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nikhil3009/Youtube.git
   cd Youtube
   ```
   Install Dependencies

Front-End:
bash
Copy code
cd front-end
npm install
Upload Service:
bash
Copy code
cd ../upload-service
npm install
Transcoder Service:
bash
Copy code
cd ../transcoder-service
npm install
Watch Service:
bash
Copy code
cd ../watch-service
npm install
Set Environment Variables

Create a .env file for each service.
Include:
AWS S3 credentials
Kafka broker URLs
PostgreSQL connection URL
NextAuth Google Client ID/Secret
Run Each Service

bash
Copy code

# In upload-service/ directory

npm start

# In transcoder-service/ directory

npm start

# In watch-service/ directory

npm start
Start the Front-End

bash
Copy code

# In front-end/ directory

npm run dev
Test the Workflow

Login via Google.
Upload a video, confirm it appears in S3.
Check Kafka logs/messages.
Confirm Transcoding by verifying the transcoded file is back in S3.
Watch the video by streaming the final output from the Watch Service.
