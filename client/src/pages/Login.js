import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        form
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/";
    } catch (err) {
      alert("Chyba při přihlášení");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Přihlášení</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Heslo" onChange={handleChange} required />
      <button type="submit">Přihlásit se</button>
    </form>
  );
}

export default Login;
