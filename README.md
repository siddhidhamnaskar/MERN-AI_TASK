# MERN AI Flow App

A simple MERN application that allows users to enter a prompt, generate an AI response using OpenRouter, visualize the flow using React Flow, and save the prompt and response to MongoDB. The app also includes a live "Online Store Preview" to show saved messages in real time.

---

## 🚀 Features

- Text Input Node to enter a prompt
- Result Node to display AI-generated response
- React Flow visualization with connected nodes
- "Run Flow" button to trigger AI response
- "Save" button to store prompt and response in MongoDB
- Secure backend API using OpenRouter (Free AI Model)

---

## 🛠️ Tech Stack

- **Frontend:** React, React Flow
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **AI API:** OpenRouter (Free model: `mistralai/mistral-7b-instruct:free`)

---

## 📁 Project Structure

```
root
│
├── frontend
│   └── (React app with React Flow)
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   └── index.js
│
└── README.md
```

---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone <your-github-repo-url>
cd <repo-folder>
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
MONGO_URI=your_mongodb_connection_string
SITE_URL=your_site_url (http://localhost:3000)
```

Start the backend server:
```bash
npm start
```

Backend will run on:
```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm start
```

Frontend will run on:
```
http://localhost:3000
```

---

## 🧪 How to Use the App

1. Type a prompt (e.g., `Sale 50% Off`) in the Input Node
2. Click **Run Flow**
3. View the AI response in the Result Node
4. Click **Save**
5. See the message appear in the **Online Store Preview**
6. Confirm the saved record in MongoDB Atlas

---

## 🧠 AI Model Used

- **Model:** `mistralai/mistral-7b-instruct:free`
- The AI is constrained to generate text-only promotional content.
- Responses are sanitized before displaying or saving.

---

## 🌐 Deployment

- Frontend and backend can be deployed using:
  - Render.com (Backend)
  - Vercel (Frontend)

---

## 🎥 Demo Video

A short video demo (2–3 minutes) shows:
- Prompt entry and AI response
- Saved record in MongoDB

---

## 📄 License

This project is created for evaluation purposes as part of the **MERN App – Developer Task**.
