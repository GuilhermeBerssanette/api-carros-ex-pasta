import userService from "../services/userService.js";

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Usuário logado encontrado com sucesso",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.user._id, req.body);

    res.status(200).json({
      message: "Perfil atualizado com sucesso",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      message: "Usuários encontrados com sucesso",
      total: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    res.status(200).json({
      message: "Usuário encontrado com sucesso",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    res.status(200).json({
      message: "Usuário atualizado com sucesso",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    res.status(200).json({
      message: "Usuário deletado com sucesso",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);

    res.status(200).json({
      message: "Usuário encontrado por email com sucesso",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const countUsers = async (req, res, next) => {
  try {
    const total = await userService.countUsers();

    res.status(200).json({
      message: "Quantidade de usuários encontrada com sucesso",
      total,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserName = async (req, res, next) => {
  try {
    const user = await userService.updateUserName(
      req.params.id,
      req.body.nome
    );

    res.status(200).json({
      message: "Nome do usuário atualizado com sucesso",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const emailExists = async (req, res, next) => {
  try {
    const exists = await userService.emailExists(req.params.email);

    res.status(200).json({
      message: "Verificação de email realizada com sucesso",
      exists,
    });
  } catch (error) {
    next(error);
  }
};

const searchUsersByName = async (req, res, next) => {
  try {
    const users = await userService.searchUsersByName(req.params.name);

    res.status(200).json({
      message: "Usuários encontrados por nome com sucesso",
      total: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAllUsers = async (req, res, next) => {
  try {
    const result = await userService.deleteAllUsers();

    res.status(200).json({
      message: "Usuários deletados com sucesso",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  getMe,
  updateMe,
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