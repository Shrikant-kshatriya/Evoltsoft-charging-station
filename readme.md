# ⚡ Evoltsoft Charging Station Management

A full-stack application to manage EV charging stations, built with **Node.js**, **Express**, **MongoDB**, and **Vue.js**. This project allows users to authenticate, manage charging stations (CRUD), and view them on a map.

---

## 🌐 Live Links

- 🔗 **Frontend App**: [https://frontend-hazel-nine-13.vercel.app](https://frontend-hazel-nine-13.vercel.app)
- 🔗 **Backend API**: [https://backend-eight-orpin-21.vercel.app](https://backend-eight-orpin-21.vercel.app)
- 🔗 **GitHub Repo**: [https://github.com/Shrikant-kshatriya/Evoltsoft-charging-station](https://github.com/Shrikant-kshatriya/Evoltsoft-charging-station)

---

## 🚀 Features

### 🔒 Authentication
- **Register** and **Login** using JWT
- Protected routes for station management

### ⚙️ Charging Station CRUD
- Add, edit, delete, and list charging stations
- Each station includes:
  - Name
  - Status (Active/Inactive)
  - Power Output (in kW)
  - Connector Type (Type1, Type2, CCS, etc.)
  - Coordinates (Latitude, Longitude)

### 🗺️ Map Integration
- Display stations on a map using **OpenStreetMap**
- Click markers to view station details

### 🔍 Filter & Search
- Filter stations by:
  - Status
  - Power Output
  - Connector Type

---

## 📂 Public API

- Base URL: `https://backend-eight-orpin-21.vercel.app`
- Public Endpoint:  
```

GET /api/public/stations
GET /api/public/stations/:id
POST /api/public/stations
PATCH /api/public/stations/:id
DELETE /api/public/stations/:id

````

---

## 📬 Postman Collection

You can find a complete Postman Collection for testing the API in the `backend` folder:  
📁 `Evoltsoft Stations.postman_collection.json`

To use:
1. Open Postman.
2. Import the JSON collection file.
3. Test REST Api for stations.

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- CORS

### Frontend
- Vue.js (Composition API)
- Tailwind CSS
- Axios
- OpenStreetMap (via Leaflet)

### Deployment
- Frontend: **Vercel**
- Backend: **Vercel**

---

## 🧪 Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/Shrikant-kshatriya/Evoltsoft-charging-station.git
cd Evoltsoft-charging-station
````

### 🚀 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGODB_URL=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL='http://localhost:3000'
NODE_ENV='development'
PORT='4000'
```

Start the server:

```bash
node index.js
```

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## ✅ Assignment Checklist

| Feature                             | Status |
| ----------------------------------- | ------ |
| Node.js + Express Backend with Auth | ✅      |
| CRUD for Charging Stations          | ✅      |
| JWT Protected Routes                | ✅      |
| Vue.js Frontend with Login          | ✅      |
| Charger Listing Page with Filters   | ✅      |
| Add/Edit/Delete Chargers            | ✅      |
| Map View with Station Markers       | ✅      |
| Public API & Postman Collection     | ✅      |
| Deployment on Cloud                 | ✅      |

---

## 📄 License

This project is submitted as part of an internship assignment. All rights reserved by the author.

## Author
Shrikant Kshatriya