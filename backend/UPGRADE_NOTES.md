# Tour ET – Backend Production Upgrade

## What Was Done

### 1. Clean Architecture Refactor
```
backend/
├── app.js                        ← Entry point (helmet, rate-limit, cors, error handler)
├── controllers/
│   ├── bookingController.js      ← Booking + Stripe checkout
│   ├── commentController.js
│   ├── hotelController.js
│   ├── packageController.js
│   ├── roomController.js
│   ├── userController.js         ← Auth (signup/login/update)
│   └── wishlistController.js
├── middleware/
│   ├── authMiddleware.js         ← protect + restrictTo (NEW)
│   ├── errorMiddleware.js        ← Global error handler (NEW)
│   └── validatorMiddleware.js    ← express-validator rules (NEW)
├── Models/
│   ├── bookingModel.js           ← Added: status, bookingId, depDate
│   └── userModel.js              ← Added: 'agent' role
├── routes/
│   ├── bookingRouter.js          ← Protected + Stripe routes
│   ├── commentRouter.js
│   ├── hotelRouter.js
│   ├── packageRouter.js
│   ├── roomRouter.js
│   ├── userRouter.js
│   └── wishlistRouter.js
└── utils/
    ├── appError.js               ← Custom error class (NEW)
    ├── apiResponse.js            ← Consistent response helper (NEW)
    └── catchAsync.js             ← Async error wrapper (NEW)
```

---

### 2. Role-Based Access Control
| Role    | Permissions |
|---------|-------------|
| `user`  | Browse, book, review, wishlist |
| `agent` | Add/update hotels and rooms |
| `admin` | Full access (CRUD on everything) |

**Middleware:**
- `protect` – Verifies JWT, attaches `req.user`
- `restrictTo('admin', 'agent')` – Role gate

---

### 3. Booking System Upgrade
- **`bookingId`** auto-generated: `TET` + timestamp + random (e.g. `TET17082345671234`)
- **`status`**: `pending` → `confirmed` → `cancelled`
- **Room availability check** before booking (prevents double-booking)
- **Room freed** when booking is deleted

---

### 4. Stripe Payment Integration (Test Mode)
**Flow:**
1. `POST /api/booking` → creates booking with `status: pending`
2. `GET /api/booking/checkout-session/:bookingId` → returns Stripe session URL
3. Frontend redirects user to Stripe hosted checkout
4. On success → `POST /api/booking/confirm-payment` → sets `status: confirmed`

**Setup:** Add your real Stripe test key to `.env`:
```
STRIPE_SECRET_KEY=sk_test_YOUR_REAL_KEY_HERE
```

---

### 5. Security Upgrades
- **Helmet** – Secure HTTP headers
- **express-rate-limit** – 100 req/hr per IP on `/api`
- **express-validator** – Input validation on signup, login, booking
- **JWT expiry** – Tokens now expire in 30 days

---

### 6. Standardized API Response Format
Every response follows:
```json
{
  "success": true,
  "message": "Descriptive message",
  "data": { ... }
}
```
Errors:
```json
{
  "success": false,
  "message": "Error description"
}
```

---

### 7. Environment Variables Required
```env
MONGODBURL=mongodb://localhost:27017/dhatchana_tour
PORT=4000
KEY=your-strong-jwt-secret-here
STRIPE_SECRET_KEY=sk_test_YOUR_REAL_KEY_HERE
NODE_ENV=development
```

---

### 8. Start the Server
```bash
cd backend
npm start
```
