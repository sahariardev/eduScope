# 📺 Video Course Platform

This repository contains a highly scalable  course platform that leverages modern 🔧 technologies to provide video streaming in  HLS format. The platform includes both an 🔨 admin panel for course management and a user-facing interface for consuming  content.

## 🔬 Tech Stack

- **Frontend**: Next.js
- **Backend**: Nest.js
- **Storage**: 📥 Amazon S3 (for file storage)
- **Queue Service**: 📢 Amazon SQS (for asynchronous task management)
- **Database**: 📊 MySQL (for data storage and retrieval)

---

## 🌐 Features

### 🔨 Admin Panel

- 💾 Upload files in chunks using a multipart upload mechanism.
- 🎮 Create and manage courses.
- ✨ Automatic transcoding of uploaded videos to HLS format.

### 👤 User Interface

- 🔄 Browse available courses.
- 🎥 Stream in HLS format for a smooth viewing experience.

### 🔄 Backend Features

- 💾 Handles uploads to Amazon S3 using multipart upload for efficient handling of large files.
- 📢 Publishes SQS events upon successful upload.
- ⏳ Listens to notifications for triggering the transcoding process.
- ⚙️ Transcodes into HLS format for adaptive streaming.
- 🌐 Scalable and fault-tolerant architecture.

---

## 📊 System Architecture

1. **Frontend**: The Next.js frontend allows admins to upload in chunks using multipart upload. Regular users can browse and view courses.

2. **Backend**:

    - The Nest.js backend processes uploads and communicates with Amazon S3.
    - After a upload, it sends a notification to an Amazon SQS queue.

3. **SQS Worker**:

    - A separate service listens to the queue for new events.
    - This worker processes the uploaded and transcodes it into multiple HLS formats for adaptive streaming.

4. **Storage**:

    - 📥 Amazon S3 is used for storing and HLS transcoded files.

5. **Database**:

    - 📊 MySQL is used to store information about courses and user data.

---

## 🔧 Installation

### Prerequisites

- 🛠️ Node.js (≥ 16.x)
- 📊 MySQL (≥ 8.x)
- 🌐 AWS account with access to S3 and SQS

### Steps

1. 🔄 Clone the repository:

   ```bash
   git clone git@github.com:sahariardev/eduScope.git
   cd eduScope
   ```

2. 🔄 Install dependencies for both frontend and backend:

   ```bash
   cd edu-scope-backend
   npm install

   cd ../edu-scope-client
   npm install
   ```

3. 🔧 Configure environment variables:

- Create `.env` files in both `frontend` and `backend` directories.
- Add the following variables:

  **Frontend `.env`**:
  ```env
  NEXT_PUBLIC_API_URL=<backend-api-url>
  ```

  **Backend `.env`**:
  ```env
  DATABASE_URL=<data_url>
  JWT_TOKEN=<jwt_sign_key>
  AWS_ACCESS_KEY_ID=<aws-access_key_id>
  AWS_SECRET_ACCESS_KEY=<aws_secret_key>
  AWS_VIDEO_UPLOAD_BUCKET=<video_upload_bucket_name>
  AWS_VIDEO_HLS_BUCKET=<hls_bucket_name>
  AWS_S3_REGION=<aws_region>
  AWS_SQS_URL=<sqs_url>
  ```

4. 🔧 Set up the database:

   ```bash
   cd edu-scope-backend
   npm run migrate
   ```

5. 🔄 Start the development servers:

   ```bash
   # Start backend
   cd edu-scope-backend
   npm run start:dev

   # Start frontend
   cd ../edu-scope-client
   npm run dev
   ```

---

## 🚀 Deployment

### Backend

- Use 🛠️ Docker or deploy directly to a cloud environment.
- Ensure the `.env` variables are properly configured in the production environment.

### Frontend

- 🔄 Build the Next.js app:
  ```bash
  npm run build
  ```
- Serve using a 📠 hosting service like Vercel or deploy on your own server.

### Worker

- Deploy the 📢 SQS worker service alongside the backend or as a standalone service.
- Ensure it has access to the 📢 queue and 📥 S3 bucket.

---

## 💡 How It Works

1. **🎥 Upload**: Admins upload files in chunks. The frontend communicates with the backend to manage multipart uploads to S3.
2. **📢 Notification**: Once the upload is complete, the backend sends an event to the SQS queue.
3. **⚙️ Transcoding**: The worker service picks up the event from and transcodes the into multiple HLS formats.
4. **🎥 Streaming**:  Users stream the directly from S3 in HLS format.

---

## 📚 Contributing

We welcome 🌐 contributions! Please submit a  pull request or open an issue for discussion.

---

## 🌐 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

For any inquiries, please contact: rifatsahariar@gmail.com

