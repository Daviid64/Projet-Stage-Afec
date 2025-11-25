import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import API from "../api.js";
import "./Admin.css";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState("");

  // Formater la durée
  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return "0h 00m";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  // Récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
    const token = localStorage.getItem("token"); // Récupère le token
    const { data } = await API.get("/users", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const filtered = data.filter(u => !(u.roles?.split(",")?.includes("super_admin"||"coordinateur")));
    setUsers(filtered);

    } catch (err) {
      console.error("Erreur fetch users :", err);
    }
  };

  // Initial fetch + actualisation toutes les 5s
  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  // Déconnexion admin/super_admin
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (role === "super_admin") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
        return;
      }

      if (token) {
        await API.post("/auth/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
      }

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";

    } catch (err) {
      console.error("Erreur logout :", err);
      alert("Impossible de se déconnecter correctement.");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
  };

  // Liste unique des agences
  const agencies = [...new Set(users.map(u => u.agency_name).filter(Boolean))];

  // Validation
  const handleValidation = async (id, status) => {
    if (!["approved", "rejected"].includes(status)) return alert("Status invalide");

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.patch(`/admin/users/${id}/validate`, { status }, { headers: { Authorization: `Bearer ${token}` } });

      // Mettre à jour localement
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
      alert(`Utilisateur ${status === "approved" ? "approuvé" : "rejeté"}`);
    } catch (err) {
      console.error("Erreur validation :", err);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer utilisateur
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(prev => prev.filter(u => u.id !== id));
      alert("Utilisateur supprimé !");
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Impossible de supprimer l'utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
        <nav className="header-nav">
          <Link to="/Home" className="nav-link">Accueil</Link>
          <Link to="/exploration" className="nav-link">Exploration des Métiers</Link>
          <button onClick={handleLogout} className="btn-logout" style={{ marginLeft: "20px" }}>Déconnexion</button>
        </nav>
      </header>

      <main className="main-content">
        <h1>Gestion des utilisateurs</h1>

        {/* Filtre agence */}
        <div style={{ marginBottom: "20px" }}>
          <label>Filtrer par Agence : </label>
          <select value={selectedAgency} onChange={e => setSelectedAgency(e.target.value)}>
            <option value="">Toutes</option>
            {agencies.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        {/* Tableau */}
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Statut</th>
              <th>Agence</th>
              <th>Région</th>
              <th>Rôle</th>
              <th>Durée de connexion</th>
              <th>Dernière connexion</th>
              <th>Date d'inscription</th>
              <th>Action</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(u => selectedAgency === "" || u.agency_name === selectedAgency)
              .map(u => (
                <tr key={u.id}>
                  <td>{u.first_name} {u.last_name}</td>
                  <td>{u.email}</td>
                  <td>{u.status}</td>
                  <td>{u.agency_name || "-"}</td>
                  <td>{u.agency_region || "-"}</td>
                  <td>{u.roles || "—"}</td>
                  <td>{formatDuration(u.total_connection_time)}</td>
                  <td>{u.last_login ? new Date(u.last_login).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "Jamais"}</td>
                  <td>{u.created_at ? new Date(u.created_at).toLocaleDateString("fr-FR") : "—"}</td>
                  <td>
                    {u.status === "pending" ? (
                      <>
                        <button onClick={() => handleValidation(u.id, "approved")} disabled={loading} className="btn-approve">Approuver</button>
                        <button onClick={() => handleValidation(u.id, "rejected")} disabled={loading} className="btn-reject">Rejeter</button>
                      </>
                    ) : (
                      <span>{u.status === "approved" ? "Approuvé" : "Rejeté"}</span>
                    )}
                  </td>
                  <td>
                    {(!u.roles || !u.roles.includes("super_admin")) && (
                      <button onClick={() => handleDelete(u.id)} disabled={loading} className="btn-delete">Supprimer</button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AdminPage;
