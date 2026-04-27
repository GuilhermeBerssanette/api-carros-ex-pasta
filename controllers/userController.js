import userService from "../services/userService.js";

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json({ message: "Usuário deletado com sucesso", user });
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const countUsers = async (req, res, next) => {
  try {
    const total = await userService.countUsers();
    res.json({ total });
  } catch (error) {
    next(error);
  }
};

const updateUserName = async (req, res, next) => {
  try {
    const user = await userService.updateUserName(req.params.id, req.body.nome);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const emailExists = async (req, res, next) => {
  try {
    const exists = await userService.emailExists(req.params.email);
    res.json({ exists });
  } catch (error) {
    next(error);
  }
};

const searchUsersByName = async (req, res, next) => {
  try {
    const users = await userService.searchUsersByName(req.params.name);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const deleteAllUsers = async (req, res, next) => {
  try {
    const result = await userService.deleteAllUsers();
    res.json({ message: "Usuários deletados com sucesso", result });
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  countUsers,
  updateUserName,
  emailExists,
  searchUsersByName,
  deleteAllUsers,
};
