import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Sale from "../models/Sale.js";

const createUser = async (data) => {
  const { nome, email, password, telefone, idade, role } = data;

  if (!nome || !email || !password) {
    const error = new Error("Nome, email e senha são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("Já existe um usuário com esse email");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    nome,
    email,
    password: hashedPassword,
    telefone,
    idade,
    role: role || "user",
  });

  return {
    _id: user._id,
    nome: user.nome,
    email: user.email,
    telefone: user.telefone,
    idade: user.idade,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const getAllUsers = async () => {
  return User.find().sort({ createdAt: -1 });
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateUser = async (id, data) => {
  if (data.email) {
    const emailExists = await User.findOne({
      email: data.email,
      _id: { $ne: id },
    });

    if (emailExists) {
      const error = new Error("Já existe outro usuário com esse email");
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const deleteUser = async (id) => {
  const salesCount = await Sale.countDocuments({ userId: id });

  if (salesCount > 0) {
    const error = new Error(
      "Não é possível deletar um usuário que possui vendas cadastradas"
    );
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const countUsers = async () => {
  return User.countDocuments();
};

const updateUserName = async (id, nome) => {
  if (!nome) {
    const error = new Error("O campo nome é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndUpdate(
    id,
    { nome },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const emailExists = async (email) => {
  const user = await User.findOne({ email });

  return Boolean(user);
};

const searchUsersByName = async (name) => {
  return User.find({
    nome: { $regex: name, $options: "i" },
  }).sort({ createdAt: -1 });
};

const deleteAllUsers = async () => {
  const salesCount = await Sale.countDocuments();

  if (salesCount > 0) {
    const error = new Error(
      "Não é possível deletar todos os usuários enquanto existirem vendas cadastradas"
    );
    error.statusCode = 400;
    throw error;
  }

  return User.deleteMany();
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