import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const username = formData.username.trim();
    const password = formData.password.trim();

    if (username === "") {
      alert("El username es obligatorio");
      return;
    }

    if (password === "") {
      alert("La password es obligatoria");
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
      navigate("/users");
    } catch {
      alert("Credenciales invalidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-card form-card">
      <h2>Login</h2>
      <div className="form-grid">
        <CustomInput
          label={"username"}
          type={"text"}
          name={"username"}
          value={formData.username}
          onChange={(event) => {
            setFormData({ ...formData, username: event.target.value });
          }}
        />
        <CustomInput
          label={"password"}
          type={"password"}
          name={"password"}
          value={formData.password}
          onChange={(event) => {
            setFormData({ ...formData, password: event.target.value });
          }}
        />
      </div>
      <CustomButton action={handleLogin}>{loading ? "Ingresando..." : "Iniciar sesion"}</CustomButton>
    </section>
  );
}

export default Login;
