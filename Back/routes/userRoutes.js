import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Rotas do usuário logado
router.get(
  "/me",
  authMiddleware,
  userController.getMe
);

router.put(
  "/me",
  authMiddleware,
  userController.updateMe
);

// Rotas de admin
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  userController.createUser
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  userController.getAllUsers
);

router.get(
  "/count",
  authMiddleware,
  adminMiddleware,
  userController.countUsers
);

router.get(
  "/email/:email",
  authMiddleware,
  adminMiddleware,
  userController.getUserByEmail
);

router.get(
  "/exists/:email",
  authMiddleware,
  adminMiddleware,
  userController.emailExists
);

router.get(
  "/search/:name",
  authMiddleware,
  adminMiddleware,
  userController.searchUsersByName
);

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.getUserById
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.updateUser
);

router.patch(
  "/:id/name",
  authMiddleware,
  adminMiddleware,
  userController.updateUserName
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

router.delete(
  "/",
  authMiddleware,
  adminMiddleware,
  userController.deleteAllUsers
);

export default router;