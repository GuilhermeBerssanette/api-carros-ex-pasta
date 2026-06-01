import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (data) => {
  const { nome, email, password, telefone, idade, role } = data;

  if (!nome || !email || !password) {
    throw new Error("Nome, email e senha são obrigatórios");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("Já existe um usuário com esse email");
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
    role: user.role,
  };
};

const login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Email ou senha inválidos");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    throw new Error("Email ou senha inválidos");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );

  return {
    user: {
      _id: user._id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export default {
  register,
  login,
};