import "./MenuComponent.css";
import { useCallback, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

interface table {
  id: number;
  name: string;
  user_id: number;
}

function MenuComponent() {
  const { user } = useUser();
  const [lists, setLists] = useState<table[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [editTableId, setEditTableId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const fetchTables = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/table`);
      if (res.ok) {
        const data = await res.json();
        setLists(data);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  }, []);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  const handleDeleteTable = async (id: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/table/${id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        setLists(lists.filter((list) => list.id !== id));
        setActiveMenuId(null);
      } else {
        console.error("Erreur lors de la suppression du tableau");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const handleEditTable = async (id: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/table/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: editName }),
        },
      );

      if (res.ok) {
        setLists(
          lists.map((list) =>
            list.id === id ? { ...list, name: editName } : list,
          ),
        );
        setEditTableId(null);
      } else {
        console.error("Erreur lors de la modification du tableau");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const handleAddList = async () => {
    if (listName.trim()) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/table`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: listName,
            user_id: user ? user.id : null,
          }),
        });

        if (res.ok) {
          const data = await res.json();

          const newTable: table = {
            id: data.insertId,
            name: listName,
            user_id: user ? user.id : 0,
          };

          setLists([...lists, newTable]);

          setListName("");
          setIsAdding(false);
        } else {
          console.error("Erreur lors de l'ajout du tableau");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    }
  };

  return (
    <section className="menu-section">
      {user ? (
        <>
          <h1>Tableaux</h1>
          <Link className="initial-table" to="/">
            Tableau initial
          </Link>
          <section className="section-user-connected">
            <h2>Vos Tableaux</h2>
            {isAdding ? (
              <section className="table-create-input">
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder="Saississez le nom du tableau ..."
                />
                <section className="buttons">
                  <button
                    className="create-list"
                    type="button"
                    onClick={handleAddList}
                  >
                    Ajouter le tableau
                  </button>
                  <button
                    className="delete-list"
                    type="button"
                    onClick={() => setIsAdding(false)}
                  >
                    ❌
                  </button>
                </section>
              </section>
            ) : (
              <button type="button" onClick={() => setIsAdding(true)}>
                +
              </button>
            )}
          </section>
          {lists.map((list) => (
            <div key={list.id} className="user-tables">
              <section>
                <button
                  className="table-setting"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuId(activeMenuId === list.id ? null : list.id);
                  }}
                >
                  ...
                </button>
                {activeMenuId === list.id && (
                  <div className="menu-popup">
                    <button
                      type="button"
                      onClick={() => {
                        setEditTableId(list.id);
                        setEditName(list.name);
                        setActiveMenuId(null);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTable(list.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </section>
              {editTableId === list.id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleEditTable(list.id)}
                  >
                    Envoyer
                  </button>
                </div>
              ) : (
                <NavLink to={`/${list.id}`} className="table-link">
                  <p>{list.name}</p>
                </NavLink>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          <h1>Tableaux</h1>
          <Link className="initial-table" to="/">
            Tableau initial
          </Link>
        </>
      )}
    </section>
  );
}

export default MenuComponent;
