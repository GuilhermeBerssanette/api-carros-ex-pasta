import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!nome || !email || !password) {
      setError("Nome, email e senha são obrigatórios");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          nome,
          email,
          telefone,
          password,
        }),
      });

      setSuccess("Usuário cadastrado com sucesso!");

      setNome("");
      setEmail("");
      setTelefone("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <section className="card">
        <h1>Cadastro</h1>
        <p className="subtitle">Crie sua conta para acessar o sistema</p>

        <form onSubmit={handleRegister}>
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Telefone</label>
          <input
            type="text"
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="link-text">
          Já tem uma conta?{" "}
          <Link className="link-button" to="/login">
            Fazer login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;