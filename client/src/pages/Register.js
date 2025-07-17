import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (res.ok) {
        setMessage("Registrace proběhla úspěšně! Přihlas se.");
        setEmail("");
        setPassword("");
      } else {
        const data = await res.json();
        setMessage(data.message || "Chyba při registraci");
      }
    } catch (error) {
      setMessage("Chyba serveru, zkuste to později.");
    }
  };

  return (
    <div>
      <h2>Registrace</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Heslo:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button type="submit">Registrovat</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
