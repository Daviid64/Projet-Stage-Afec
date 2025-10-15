import React, { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Veuillez remplir les champs obligatoires." });
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Merci ! Votre message a bien été envoyé." });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (err) {
      setStatus({ type: "error", message: "Une erreur est survenue, veuillez réessayer." });
    }
  };

  return (
    <div className="contact-container">
      <h2>Formulaire de Contact</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Nom *</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Votre nom"
          required
        />

        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="votre@email.com"
          required
        />

        <label htmlFor="subject">Sujet</label>
        <input
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Sujet de votre message"
        />

        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Écrivez votre message..."
          required
        />

        <button type="submit">Envoyer</button>

        {status.message && (
          <div className={`message ${status.type}`}>{status.message}</div>
        )}
      </form>
    </div>
  );
}
