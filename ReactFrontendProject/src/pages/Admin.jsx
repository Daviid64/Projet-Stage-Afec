import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import API from "../api.js";
import "./Admin.css";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users");

      const filteredUsers = data.filter(user => {
        if (!user.roles) return true; 
        const rolesArray = user.roles.split(","); 
        return !rolesArray.includes("super_admin"); 
      });

      setUsers(filteredUsers);

    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
    }
  };
  fetchUsers();
}, []);

  const handleValidation = async (id, status) => {
    if (!["approved", "rejected"].includes(status)){
      alert("Status invalide");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.patch(
        `/admin/users/${id}/validate`,
        {status},
        {headers: {Authorization: `Bearer ${token}`}}
      );

      // Met à jour localement le tableau
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
        u.id === id ? { ...u, status: status} : u
      )
    );

    alert(`Utilisateur ${status === "approved" ? "approuvé" : "rejeté"}`); 
    } catch (err) {
      console.error("Erreur lors de la validation:", err);
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
              <th>Agence</th>
              <th>Région</th>
              <th>Rôle</th>
              <th>Dernière connexion</th>
              <th>Date d'inscription</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user)=> (
                <tr key={user.id}>
                  <td>{user.first_name} {user.last_name}</td>                  
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>{user.agency_name || "-"}</td>
                  <td>{user.agency_region || "-"}</td>
                  <td>{user.roles || "—"}</td>

                  <td>
                  {user.last_login
                    ? new Date(user.last_login).toLocaleString("fr-FR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                      : "Jamais"}
                  </td>

                  <td>
                  {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("fr-FR")
                  : "—"}
                  </td>


                  <td>
                    {user.status === "pending" ? (
                      <>
                        <button onClick={() => handleValidation(user.id, "approved")}
                          disabled={loading}
                          className="btn-approve"
                          >
                            Approuver
                        </button>
                        <button onClick={() => handleValidation(user.id, "rejected")}
                          disabled={loading}
                          className="btn-reject"
                          >
                            Rejeter
                        </button>
                      </>
                    ) : (
                      <span>
                        {user.status === "approved"
                        ? "Approuvé"
                        : "Rejeté"}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Aucun utilisateur trouvé</td>
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