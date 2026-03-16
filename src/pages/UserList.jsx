import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomTable from "../components/CustomTable";
import {
  getDeletedUserIds,
  getLocalUserById,
  getLocalUsers,
  removeLocalUserById,
  saveDeletedUserId,
} from "../utils/localUsers";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const columns = ["Id", "Name", "Email", "Acciones"];

  const loadUsers = async () => {
    const response = await fetch("https://fakestoreapi.com/users");
    const data = await response.json();
    const localUsers = getLocalUsers();
    const deletedIds = getDeletedUserIds();
    const filteredApiUsers = data.filter((user) => !deletedIds.includes(String(user.id)));
    const filteredLocalUsers = localUsers.filter((user) => !deletedIds.includes(String(user.id)));
    setUsers([...filteredLocalUsers, ...filteredApiUsers]);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    const localUser = getLocalUserById(id);

    try {
      if (!String(id).startsWith("local-")) {
        const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Delete failed");
        }
      }

      if (localUser) {
        removeLocalUserById(id);
      }

      saveDeletedUserId(id);
      setUsers((currentUsers) => currentUsers.filter((user) => String(user.id) !== String(id)));
      alert("Usuario eliminado");
    } catch {
      alert("No se pudo eliminar el usuario");
    }
  };

  const tableData = users.map((user) => ({
    id: user.id,
    name: `${user.name?.firstname ?? ""} ${user.name?.lastname ?? ""}`.trim(),
    email: user.email,
    acciones: (
      <>
        <CustomButton action={() => navigate(`/userDetails/${user.id}`)}>Ver</CustomButton>
        <CustomButton action={() => handleDeleteUser(user.id)}>Borrar</CustomButton>
      </>
    ),
  }));

  return (
    <section className="page-card">
      <div className="section-header">
      <h2>User List</h2>
      <CustomButton action={() => navigate("/createUser")}>Crear usuario</CustomButton>
      </div>
      {users.length === 0 ? (
        <p className="empty-state">No hay usuarios disponibles</p>
      ) : (
        <CustomTable columns={columns} data={tableData} />
      )}
    </section>
  );
}

export default UserList;
