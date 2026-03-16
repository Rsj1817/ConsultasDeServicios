import { useState } from "react";
import { AuthContext } from "./authContext";

function getStoredUser() {
  const storedUser = localStorage.getItem("auth-user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem("auth-token") || "");

  const login = async (username, password) => {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data?.token) {
      throw new Error(data?.message || "Login failed");
    }

    const user = {
      username,
    };

    localStorage.setItem("auth-user", JSON.stringify(user));
    localStorage.setItem("auth-token", data.token);

    setCurrentUser(user);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("auth-user");
    localStorage.removeItem("auth-token");
    setCurrentUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
