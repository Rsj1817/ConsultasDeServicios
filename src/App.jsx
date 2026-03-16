import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CustomButton from "./components/CustomButton";
import useAuth from "./hooks/useAuth";
import CreateUser from "./pages/CreateUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDetail from "./pages/UserDetail";
import UserList from "./pages/UserList";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  return (
    <div className="app-shell">
      <div className="topbar">
        <div className="topbar-title">
          <h1>Consultas de Servicios</h1>
          <p>Fake Store API</p>
        </div>
        <div className="topbar-actions">
        <CustomButton action={() => navigate("/")}>Home</CustomButton>
        {!currentUser ? (
          <CustomButton action={() => navigate("/login")}>Login</CustomButton>
        ) : (
          <>
            <CustomButton action={() => navigate("/users")}>Usuarios</CustomButton>
            <CustomButton action={() => navigate("/createUser")}>Crear usuario</CustomButton>
            <CustomButton
              action={() => {
                logout();
                navigate("/");
              }}
            >
              Cerrar sesion
            </CustomButton>
          </>
        )}
      </div>
      </div>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createUser"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userDetails/:id"
            element={
              <ProtectedRoute>
                <UserDetail />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
