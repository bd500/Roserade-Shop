import express from "express";
import {
    authUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserProfile,
    registerUser,
    updatePrivateUser,
    updateUser,
} from "../controllers/userController.js";
import {protect, admin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.route("/").get(protect, admin, getAllUsers);
router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updatePrivateUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser);

export default router;
