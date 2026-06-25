import express from "express";
import { 
    registerUser,   // ← Must match export name
    loginUser,      // ← Must match export name
    getCurrentUser,
    logoutUser, 
    refreshAccessToken
} from "../controllers/auth.controller.js";
import  verifyJWT  from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
// Protected routes
router.get("/current-user", verifyJWT, getCurrentUser);

// ✅ Add test route to verify it's working
router.get("/test", (req, res) => {
    res.json({ message: "Auth routes are working!" });
});

export default router; // ← CRITICAL: Must have this!