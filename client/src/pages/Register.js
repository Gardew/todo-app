import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      alert("Registrace úspěšná. Nyní se přihlaste.");
      window.location.href = "/login";
    } catch (err) {
      alert("Chyba při registraci");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrace</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Heslo" onChange={handleChange} required />
      <button type="submit">Registrovat se</button>
    </form>
  );
}

export default Register;
