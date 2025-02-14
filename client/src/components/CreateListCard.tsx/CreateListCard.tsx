import { useState } from "react";

// Interfaces pour les types de données
interface List {
  id: number;
  name: string;
  position: number;
  tableId: number;
}

interface Card {
  id: number;
  name: string;
  listId: number;
}

const CreateListCard = ({ tableId }: { tableId: number }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState("");
  const [addingCardListId, setAddingCardListId] = useState<number | null>(null);
  const [cardName, setCardName] = useState("");
  const [openModalId, setOpenModalId] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Fonction pour ajouter une nouvelle liste via un POST
  const handleAddList = () => {
    if (listName.trim()) {
      const newListPosition =
        lists.length > 0 ? lists[lists.length - 1].position + 1 : 0;

      // Vérifier que tableId existe
      if (!tableId) {
        console.error("tableId is undefined!");
        return;
      }

      const newList = {
        id: Date.now(),
        name: listName,
        position: newListPosition,
        tableId: tableId,
      };

      setLists([...lists, newList]);
      setListName("");
      setIsAdding(false);

      // Envoi au serveur
      fetch(`${import.meta.env.VITE_API_URL}/api/lists`, {
        method: "POST",
        body: JSON.stringify(newList),
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  // Fonction pour ajouter une carte via un POST
  const handleAddCard = async (listId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            position: 0,
            listId: listId,
          }),
        },
      );

      const data = await response.json();
      console.warn(data);
    } catch (error) {
      console.error("Erreur lors de la création de la carte :", error);
    }
  };

  // Ouvrir la modale
  const handleOpenModal = (id: number, name: string) => {
    setOpenModalId(id);
    setEditingItem({ id, name });
  };

  // Fermer la modale
  const handleCloseModal = () => {
    setOpenModalId(null);
    setEditingItem(null);
  };

  // Modifier un élément (liste ou carte) via un PUT
  const handleEditItem = async (newName: string) => {
    if (!editingItem) return;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/${editingItem.name === newName ? "lists" : "cards"}/${editingItem.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      },
    );

    const updatedItem = await response.json();

    if (editingItem.name === newName) {
      setLists(
        lists.map((list) => (list.id === editingItem.id ? updatedItem : list)),
      );
    } else {
      setCards(
        cards.map((card) => (card.id === editingItem.id ? updatedItem : card)),
      );
    }

    handleCloseModal();
  };

  // Supprimer un élément (liste ou carte) via un DELETE
  const handleDeleteItem = async (id: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/${openModalId ? "lists" : "cards"}/${id}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      setLists(lists.filter((list) => list.id !== id));
      setCards(cards.filter((card) => card.id !== id));
    }

    handleCloseModal();
  };

  return (
    <>
      {lists.map((list) => (
        <section key={list.id} className="list">
          <section className="list-header">
            <h3>{list.name}</h3>
            {openModalId !== null && (
              <section className="modal">
                <section className="menu-modal">
                  <button
                    className="button-delete-list"
                    type="button"
                    onClick={() =>
                      handleEditItem(
                        prompt("Nouveau nom :", editingItem?.name || "") || "",
                      )
                    }
                  >
                    <img src="/Logo/Logo-Modifier.png" alt="Modifier" />
                  </button>
                  <button
                    className="button-delete-list"
                    type="button"
                    onClick={() => handleDeleteItem(openModalId)}
                  >
                    <img src="/Logo/Logo-delete (1).jpg" alt="Supprimer" />
                  </button>
                  <button
                    type="button"
                    className="button-delete-list"
                    onClick={handleCloseModal}
                  >
                    ❌
                  </button>
                </section>
              </section>
            )}
            <button
              type="button"
              onClick={() => handleOpenModal(list.id, list.name)}
            >
              ⋮
            </button>
          </section>

          <div className="cards-container">
            {cards
              .filter((card) => card.listId === list.id)
              .map((card) => (
                <section key={card.id} className="card">
                  <h4>{card.name}</h4>
                  <button
                    type="button"
                    onClick={() => handleOpenModal(card.id, card.name)}
                  >
                    ⋮
                  </button>
                </section>
              ))}
          </div>

          {/* Ajouter une carte */}
          {addingCardListId === list.id ? (
            <section className="list-create-input">
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Nom de la carte..."
              />
              <section className="buttons">
                <button
                  className="create-list"
                  type="button"
                  onClick={() => handleAddCard(list.id)}
                >
                  Ajouter la carte
                </button>
                <button type="button" onClick={() => setAddingCardListId(null)}>
                  ❌
                </button>
              </section>
            </section>
          ) : (
            <button
              className="create-card"
              type="button"
              onClick={() => setAddingCardListId(list.id)}
            >
              Ajouter une carte
            </button>
          )}
        </section>
      ))}

      {/* Ajout d'une nouvelle liste */}
      {isAdding ? (
        <section className="list-create-input">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Saisissez le nom de la liste..."
          />
          <section className="buttons">
            <button
              className="create-list"
              type="button"
              onClick={handleAddList}
            >
              Ajouter la liste
            </button>
            <button type="button" onClick={() => setIsAdding(false)}>
              ❌
            </button>
          </section>
        </section>
      ) : (
        <section className="create-list-section">
          <button type="button" onClick={() => setIsAdding(true)}>
            <img src="/Logo/Logo-Add-modified.png" alt="Ajouter une liste" />
            Ajouter une liste
          </button>
        </section>
      )}
    </>
  );
};

export default CreateListCard;
