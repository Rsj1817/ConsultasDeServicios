import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import useAuth from "../hooks/useAuth";

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <section className="page-card page-card--compact">
      <h2>Home</h2>
      <p>Aplicacion de autenticacion y gestion de usuarios con Fake Store API.</p>
      {currentUser ? (
        <CustomButton action={() => navigate("/users")}>Ir a usuarios</CustomButton>
      ) : (
        <CustomButton action={() => navigate("/login")}>Ir a login</CustomButton>
      )}
    </section>
  );
}

export default Home;
