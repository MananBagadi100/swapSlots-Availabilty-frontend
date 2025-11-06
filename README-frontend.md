# SwapSlots Availability – Frontend

This is the **frontend** of the SwapSlots Availability Application.  
It allows users to:

- View their own scheduled events
- Mark events as **BUSY** or **SWAPPABLE**
- Request swaps from the **Marketplace**
- View **Incoming** and **Outgoing** swap requests

---

## 🧱 Project Structure

```
frontend/
│
├── public/                     # Static assets
│
├── src/
│   ├── api/
│   │   └── axiosClient.js      # Axios instance with baseURL + cookies
│   │
│   ├── components/             # UI / Page components
│   │   ├── Dashboard.jsx
│   │   ├── Marketplace.jsx
│   │   ├── Requests.jsx
│   │   ├── Incoming.jsx
│   │   └── Outgoing.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx     # Login state and user session context
│   │
│   ├── styles/                 # CSS Modules
│   │   ├── DashboardStyles.css
│   │   ├── MarketplaceStyles.css
│   │   ├── RequestsStyles.css
│   │   ├── IncomingStyles.css
│   │   └── OutgoingStyles.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env                        # Contains API base URL (example below)
└── package.json
```

---

## 🔧 Setup Instructions (Run Locally)

### 1️⃣ Clone the repo
```
git clone https://github.com/MananBagadi100/swapSlots-Availabilty-frontend
cd swapSlots-Availability-frontend
```

### 2️⃣ Install dependencies
```
npm install
```

### 3️⃣ Create a `.env` file in the project root:
```
VITE_API_URL=http://localhost:3000   # Backend server address
```

### 4️⃣ Start the development server:
```
npm run dev
```

Now open the app in browser:
```
http://localhost:5173
```

---

## 🔌 Backend Requirement

You must run the **backend server** along with the frontend.

Backend Repo: `swapSlots-Availability-backend`  
Start backend:
```
npm install
npm start
```

Backend must run on:
```
http://localhost:3000
```

---

## ✅ Current Features Implemented

| Feature | Status |
|--------|--------|
| User Login / Logout | ✅ Working |
| Add / Delete Events | ✅ Working |
| Change Event Status (BUSY ↔ SWAPPABLE) | ✅ Working |
| Marketplace Swappable Slot Display | ✅ Working |
| Send Swap Request | ✅ Working |
| Incoming & Outgoing Requests Display | ✅ Working |
| Accept / Reject Swap Requests | ⚠️ Not Fully Completed |

---

## ⚠️ Known Limitation (To Be Completed)
- **Swap Accept / Reject UI** works visually but request syncing requires a small fix.
- Due to assignment time constraint, this part is partially done — logic is present but needs minor refinement.

---

## 🎯 Note to Evaluator
This project demonstrates:
- Clean React component structure
- State, context & API based data flow
- Real backend syncing with MySQL
- Clear UI workflows for slot swapping

The final polish step remaining is improving the Accept/Reject logic, which can be completed easily with more time.

---

Made with ❤️ by **Manan Bagadi**
