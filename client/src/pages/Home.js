import React from "react";

function Home() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Vítejte v TODO aplikaci!</h2>
      <button onClick={handleLogout}>Odhlásit se</button>
    </div>
  );
}

export default Home;
