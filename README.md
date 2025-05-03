# waste-wise
waste classifier and disposal guide

Frontend of the Waste Recycling App built using React.js and Tailwind CSS. It allows users to log in via Firebase Authentication, scan recyclable items, earn points, and view a real-time leaderboard of top contributors. The app aims to gamify recycling and promote environmental responsibility.
🔐 Firebase Authentication (Email/Password or Google login)

📸 Waste Scanning Interface for earning points

🏅 Leaderboard Page displaying top users by score

🧾 User Dashboard with current score and profile info

⚡ Fast, responsive UI powered by Tailwind CSS

🔄 Real-time integration with backend API

🧱 Tech Stack
React.js

Tailwind CSS

Firebase Auth

Axios (for API calls)

React Router DOM

📁 Project Structure
arduino
Copy
Edit
waste-recycling-frontend/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── LeaderboardPage.jsx
│   ├── components/
│   │   └── Navbar.jsx, Loader.jsx, etc.
│   ├── services/
│   │   └── api.js          # Axios config
│   ├── firebase.js         # Firebase config
│   ├── App.jsx
│   └── main.jsx
├── public/
├── tailwind.config.js
└── vite.config.js
📡 API Integration
The frontend communicates with the backend at:

perl
Copy
Edit
http://<your-local-ip>:5000/api/
Example endpoints:
POST /api/users/me/score – Add points (after scanning)

GET /api/users/me – Get current user profile

GET /api/leaderboard – Fetch top scorers

Make sure to replace the base URL with your local or deployed backend IP.

🛠️ Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/waste-recycling-frontend.git
cd waste-recycling-frontend
Install dependencies

bash
Copy
Edit
npm install
Configure Firebase

In src/firebase.js, add your Firebase config object.

Run the development server

bash
Copy
Edit
npm run dev
Open the app

arduino
Copy
Edit
http://localhost:5173
🔐 Environment Variables (optional)
You can create a .env file for the Firebase keys:

makefile
Copy
Edit
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
...
📸 Future Enhancements
Add real waste image classification using ML

User badges/achievements system

Progress charts & analytics



The backend server for the Waste Recycling App, built using Node.js, Express, and Firebase Admin SDK. It provides APIs to support features like user authentication, score tracking, and a dynamic leaderboard that rewards users for recycling activities.

🚀 Features
🔒 Secure Firebase Authentication with token verification middleware

📈 User Score Tracking using Firestore’s atomic increment

🧑‍🤝‍🧑 Auto-generated User Profiles on first login

🏆 Leaderboard API to fetch top users by score

🔍 Image Analysis Endpoint placeholder for future AI-based waste detection

🌐 CORS enabled for frontend-backend communication

📱 QR Code generation for easy mobile access to the frontend

🛠️ Modular Route Structure and centralized error handling

🧱 Tech Stack
Node.js

Express.js

Firebase Admin SDK (Firestore + Auth)

qrcode-terminal for CLI-based QR code

dotenv for environment configuration

📁 Project Structure
bash
Copy
Edit
waste-recycling-backend/
├── routes/
│   ├── analysisRoutes.js       # Placeholder for image analysis logic
│   ├── userRoutes.js           # User profile & score management
│   └── leaderboardRoutes.js    # Leaderboard endpoints
├── middleware/
│   └── authMiddleware.js       # Firebase token verification
├── firebase-admin-key.json     # Firebase service account (keep private)
├── server.js                   # Main entry point
├── .env                        # Environment variables
└── package.json
📡 API Endpoints
User Routes
GET /api/users/me – Fetch current user's profile

POST /api/users/me/score – Add points to the user’s score (requires auth)

Leaderboard
GET /api/leaderboard – Get top 10 users ranked by score

Test
GET /api/test – Check if the API is live

🛠️ Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/waste-recycling-backend.git
cd waste-recycling-backend
Install dependencies

bash
Copy
Edit
npm install
Add your Firebase Admin SDK key

Place your Firebase service account key as firebase-admin-key.json in the root directory.

Create a .env file

env
Copy
Edit
PORT=5000
Start the server

bash
Copy
Edit
npm start
Visit the test endpoint

bash
Copy
Edit
http://localhost:5000/api/test
🔒 Notes
Keep firebase-admin-key.json private and secure. Do not commit it to GitHub.

Make sure your Firestore has a users collection for score tracking.

Frontend must pass a valid Firebase Auth ID token in headers for protected routes.

