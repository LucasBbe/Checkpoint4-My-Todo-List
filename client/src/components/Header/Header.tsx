import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
import { useUser } from "../../Context/UserContext";

function Header() {
  const { user, logout } = useUser();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
  };

  return (
    <section className="the-header">
      <Link to="/">
        <img src="\Logo\Logo-ToDoList.png" alt="Logo du site ToDoLo" />
      </Link>
      <section>
        {user ? (
          ""
        ) : (
          <>
            <Link to="/login" type="button">
              Login
            </Link>
            <Link to="/register" className="button-register" type="button">
              Register
            </Link>
          </>
        )}
        {user ? (
          <img
            className="logo-profile-not-connected"
            src="\Logo\Logo-profile-connected.png"
            alt="Logo de l'utilisateur connecté"
          />
        ) : (
          <img
            className="logo-profile-not-connected"
            src="\Logo\Logo-profile-not-connected.png"
            alt="Logo de l'utilisateur non connecté"
          />
        )}
        {user ? (
          <>
            <button
              type="button"
              className="user-button"
              onClick={handleToggleDropdown}
            >
              <p>{user.name}</p>
              <img
                className="chevron"
                src="\Logo\chevron.png"
                alt="Logo d'une flèche indiquant à l'utilisateur qu'il peut déplier un élément"
              />
            </button>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <h3>Profile</h3>
                <button
                  type="button"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            className="user-button"
            onClick={handleToggleDropdown}
          >
            <p>User</p>
            <img
              className="chevron"
              src="\Logo\chevron.png"
              alt="Logo d'une flèche indiquant à l'utilisateur qu'il peut déplier un élément"
            />
          </button>
        )}
      </section>
    </section>
  );
}

export default Header;
