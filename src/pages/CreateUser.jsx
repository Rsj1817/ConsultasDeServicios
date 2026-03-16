import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { saveLocalUser } from "../utils/localUsers";

function CreateUser() {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleCreateUser = async () => {
    const trimmedName = newUser.name.trim();
    const trimmedEmail = newUser.email.trim();
    const trimmedPassword = newUser.password.trim();

    if (trimmedName === "") {
      alert("El nombre es obligatorio");
      return;
    }

    if (trimmedEmail === "") {
      alert("El email es obligatorio");
      return;
    }

    if (trimmedPassword === "") {
      alert("La contraseña es obligatoria");
      return;
    }

    const [firstname, ...lastnameParts] = trimmedName.split(" ");
    const lastname = lastnameParts.join(" ");

    const userPayload = {
      email: trimmedEmail,
      username: trimmedEmail.split("@")[0] || trimmedName.replaceAll(" ", "").toLowerCase(),
      password: trimmedPassword,
      name: {
        firstname,
        lastname,
      },
    };

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        const error = new Error("Error al crear el usuario");
        error.status = response.status;
        error.statusText = data.message;
        throw error;
      }

      const localUser = {
        ...userPayload,
        id: data.id ?? `local-${Date.now()}`,
      };

      saveLocalUser(localUser);
      navigate(`/userDetails/${localUser.id}`);
    } catch (error) {
      alert(`Error ${error.status}: ${error.statusText}`);
    }
  };

  return (
    <section className="page-card form-card">
      <h2>Crear usuario</h2>
      <div className="form-grid">
        <CustomInput
          label={"name"}
          type={"text"}
          name={"name"}
          value={newUser.name}
          onChange={(event) => {
            setNewUser({ ...newUser, name: event.target.value });
          }}
        />

        <CustomInput
          label={"email"}
          type={"email"}
          name={"email"}
          value={newUser.email}
          onChange={(event) => {
            setNewUser({ ...newUser, email: event.target.value });
          }}
        />

        <CustomInput
          label={"password"}
          type={"password"}
          name={"password"}
          value={newUser.password}
          onChange={(event) => {
            setNewUser({ ...newUser, password: event.target.value });
          }}
        />

        <CustomButton action={handleCreateUser}>Crear usuario</CustomButton>
      </div>
    </section>
  );
}

export default CreateUser;
