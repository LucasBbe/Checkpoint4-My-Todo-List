import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <section className="the-header">
      <Link to="/">
        <img src="\Logo\Logo-ToDoList.png" alt="Logo du site ToDoLo" />
      </Link>
      <section>
        <Link to="/login" type="button">
          Login
        </Link>
        <Link to="/register" className="button-register" type="button">
          Register
        </Link>
        <img
          className="logo-profile-not-connected"
          src="\Logo\Logo-profile-not-connected.png"
          alt="Logo de l'utilisateur non connecté"
        />
        <button type="button" className="user-button">
          <p>User</p>
          <img
            className="chevron"
            src="\Logo\chevron.png"
            alt="Logo d'une fleche indiquant à l'utilisateur le fait de pouvoir déplier un élément"
          />
        </button>
      </section>
    </section>
  );
}

export default Header;
