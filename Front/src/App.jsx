import { Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <main className="container">
      <section className="card">
        <h1>Bem-vindo!</h1>

        {user && (
          <>
            <p>Você está logado como:</p>
            <strong>{user.nome}</strong>
            <p>{user.email}</p>
            <p>Perfil: {user.role}</p>
          </>
        )}

        <button onClick={handleLogout}>Sair</button>
      </section>
    </main>
  );
};

const App = () => {
  return (
    <>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Cadastro</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;