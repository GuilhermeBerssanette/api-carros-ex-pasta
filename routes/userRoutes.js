import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);

// Rotas específicas precisam vir antes de /:id
router.get("/count", userController.countUsers);
router.get("/email/:email", userController.getUserByEmail);
router.get("/exists/:email", userController.emailExists);
router.get("/search/:name", userController.searchUsersByName);

router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.patch("/:id/name", userController.updateUserName);
router.delete("/:id", userController.deleteUser);

router.delete("/", userController.deleteAllUsers);

export default router;
