import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocalUserById, isUserDeleted } from "../utils/localUsers";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      if (!id || isUserDeleted(id)) {
        setError("User not found");
        setLoading(false);
        return;
      }

      const localUser = getLocalUserById(id);

      if (localUser) {
        setUser(localUser);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://fakestoreapi.com/users/${id}`);
        const data = await response.json();

        if (!response.ok || !data?.id) {
          throw new Error("User not found");
        }

        setUser(data);
      } catch {
        setError("User not found");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return <section className="page-card page-card--compact"><h2>Loading user...</h2></section>;
  }

  if (error) {
    return <section className="page-card page-card--compact"><h2>{error}</h2></section>;
  }

  return (
    <section className="page-card detail-card">
      <h2>User Detail</h2>
      <div className="detail-grid">
        <p><strong>Id:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name?.firstname} {user.name?.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
      </div>
    </section>
  );
}

export default UserDetail;
