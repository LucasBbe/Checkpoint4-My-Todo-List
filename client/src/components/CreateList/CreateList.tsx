import "./CreateList.css";
import { useState } from "react";

interface List {
  id: number;
  name: string;
}

const CreateList = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState("");

  const handleAddList = () => {
    if (listName.trim()) {
      setLists([...lists, { id: Date.now(), name: listName }]);
      setListName("");
      setIsAdding(false);
    }
  };

  const handleDeleteList = (id: number) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  return (
    <>
      {lists.map((list) => (
        <section key={list.id} className="list">
          <section>
            <h3>{list.name}</h3>
            <button type="button" onClick={() => handleDeleteList(list.id)}>
              <img
                src="\Logo\Logo-delete (1).jpg"
                alt="Supprimé ma liste qui avait été créer"
              />
            </button>
          </section>
          <button className="create-card" type="button">
            <img
              src="public/Logo/Logo-Add-modified.png"
              alt="Logo pour ajouter une list"
            />
            Ajouter une carte
          </button>
        </section>
      ))}

      {isAdding ? (
        <section className="list-create-input">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Saississez le nom de la liste ..."
          />
          <section className="buttons">
            <button
              className="create-list"
              type="button"
              onClick={handleAddList}
            >
              Ajouter la liste
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
        <section className="create-list-section">
          <button type="button" onClick={() => setIsAdding(true)}>
            <img
              src="public/Logo/Logo-Add-modified.png"
              alt="Logo pour ajouter une list"
            />
            Ajouter une liste
          </button>
        </section>
      )}
    </>
  );
};

export default CreateList;
