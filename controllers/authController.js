import authService from "../services/authService.js";

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      message: "Login realizado com sucesso",
      data: result,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default {
  register,
  login,
};