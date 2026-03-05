# 🇮🇳 Explore India Travel Platform

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb" />
</p>

> **Explore India** is a modern full-stack travel booking web application that transforms how people discover and experience the incredible diversity of India — from the snow-capped Himalayas to the golden beaches of Goa, from bustling metros to ancient heritage sites.

---

## 🌟 About the Project

**Explore India** is built to make travel planning seamless and enjoyable. Whether you're a solo traveler, a family, or a group — our platform connects you with the best travel packages, hotels, and experiences across India.

Built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with JWT-based authentication and a clean, responsive UI.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🗺️ **Travel Packages** | Browse curated packages — city tours, adventure trips, pilgrimage routes, beach getaways |
| 🔍 **Search & Filter** | Search destinations by name, location, category, or price |
| ⭐ **Reviews & Ratings** | Read & write authentic traveler reviews and rate packages |
| 🔖 **Wishlist** | Save favourite packages and book them anytime |
| 📅 **Easy Booking** | Seamless booking flow with hotel and itinerary selection |
| 👤 **User Authentication** | Secure login & registration with JWT tokens |
| 🛡️ **Role-Based Access** | Separate roles for Admin, Staff & Customers |
| 📢 **Notice Board** | Latest travel announcements, offers & alerts |
| 📱 **Responsive Design** | Fully optimized for mobile, tablet & desktop |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — Component-based UI library
- **React Router** — Client-side navigation
- **Axios** — HTTP requests to backend APIs
- **CSS3** — Custom animations and styling

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — RESTful API framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM

### Security
- **JWT (JSON Web Tokens)** — Secure user authentication
- **bcrypt.js** — Password hashing

---

## 📁 Project Structure

```
IndiaExplorer/
├── backend/
│   ├── controllers/       # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API route definitions
│   ├── middleware/        # Auth & error middleware
│   └── server.js          # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── context/       # Auth & global state
│   │   └── App.jsx        # Root component
│   └── public/
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm

```sh
npm install npm@latest -g
```

### Installation & Setup

**1. Clone the repository**
```sh
git clone https://github.com/msdhatchanamoorthy/IndiaExplorer.git
cd IndiaExplorer
```

**2. Setup Backend**
```sh
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**3. Setup Frontend**
```sh
cd ../frontend
npm install
```

**4. Run the Application**

Start Backend (Terminal 1):
```sh
cd backend
npm start
```

Start Frontend (Terminal 2):
```sh
cd frontend
npm start
```

**5. Open in Browser**
```
http://localhost:3000
```

---

## 🌐 Live Demo

> Coming soon...

---

## 👨‍💻 Developer

**M S Dhatchanamoorthy**
- 🐙 GitHub: [@msdhatchanamoorthy](https://github.com/msdhatchanamoorthy)
- 📁 Repository: [IndiaExplorer](https://github.com/msdhatchanamoorthy/IndiaExplorer)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ for Incredible India 🇮🇳
</p>
