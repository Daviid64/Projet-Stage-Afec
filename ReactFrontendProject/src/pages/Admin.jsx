import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import API from "../api.js";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger la liste des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/users");
        setUsers(data);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs :", err);
      }
    };
    fetchUsers();
  }, []);

  // Changer le rôle d’un utilisateur
  const handleChangeRole = async (id) => {
    setLoading(true);
    try {
      await API.patch(`/users/${id}/role`, { role_name: "coordinateur" });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, role_name: "coordinateur" } : user
        )
      );
      alert("Utilisateur promu en coordinateur !");
    } catch (err) {
      console.error("Erreur :", err);
      alert("Impossible de changer le rôle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />

        <nav className="header-nav">
          <Link to="/exploration" className="nav-link">
            Exploration des Métiers
          </Link>
        </nav>
      </header>

      <main className="main-content">
        <h1>Gestion des utilisateurs</h1>

        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Statut</th>
              <th>Rôle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(users) && users.length > 0 ? (
    users.map((user) => (
      <tr key={user.id}>
        <td>{user.first_name} {user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.status}</td>
        <td>{user.role_name}</td>
        <td>
          <button
            onClick={() => handleChangeRole(user.id)}
            disabled={loading || user.role_name === "coordinateur"}
          >
            Promouvoir
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">Aucun utilisateur trouvé</td>
    </tr>
  )}
</tbody>

        </table>
      </main>

      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default AdminPage;
