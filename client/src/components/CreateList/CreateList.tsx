import "./CreateList.css";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  type DropResult,
  Droppable,
} from "react-beautiful-dnd";

interface List {
  id: number;
  name: string;
}

interface Card {
  id: number;
  name: string;
  listId: number;
}

const CreateList = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState("");
  const [editingListId, setEditingListId] = useState<number | null>(null);
  const [editingListName, setEditingListName] = useState("");
  const [addingCardListId, setAddingCardListId] = useState<number | null>(null);
  const [cardName, setCardName] = useState("");

  const handleAddList = () => {
    if (listName.trim()) {
      setLists([...lists, { id: Date.now(), name: listName }]);
      setListName("");
      setIsAdding(false);
    }
  };

  const handleDeleteList = (id: number) => {
    setLists(lists.filter((list) => list.id !== id));
    setCards(cards.filter((card) => card.listId !== id));
  };

  const handleEditList = (id: number, name: string) => {
    setEditingListId(id);
    setEditingListName(name);
  };

  const handleSaveListName = (id: number) => {
    setLists(
      lists.map((list) =>
        list.id === id ? { ...list, name: editingListName } : list,
      ),
    );
    setEditingListId(null);
  };

  const handleAddCard = (listId: number) => {
    if (cardName.trim()) {
      setCards([...cards, { id: Date.now(), name: cardName, listId }]);
      setCardName("");
      setAddingCardListId(null);
    }
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newCards = Array.from(cards);
    const [movedCard] = newCards.splice(result.source.index, 1);
    movedCard.listId = Number.parseInt(result.destination.droppableId, 10);
    newCards.splice(result.destination.index, 0, movedCard);
    setCards(newCards);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {lists.map((list) => (
        <section key={list.id} className="list">
          <section className="list-header">
            {editingListId === list.id ? (
              <input
                type="text"
                value={editingListName}
                onChange={(e) => setEditingListName(e.target.value)}
                onBlur={() => handleSaveListName(list.id)}
              />
            ) : (
              <h3>{list.name}</h3>
            )}
            <button
              type="button"
              onClick={() => handleEditList(list.id, list.name)}
            >
              <img
                src="/Logo/Logo-Modifier.png"
                alt="Modifier"
                className="icon"
              />
            </button>
            <button type="button" onClick={() => handleDeleteList(list.id)}>
              <img
                src="/Logo/Logo-delete (1).jpg"
                alt="Supprimer"
                className="icon"
              />
            </button>
          </section>

          <Droppable droppableId={list.id.toString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="cards-container"
              >
                {cards
                  .filter((card) => card.listId === list.id)
                  .map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card"
                        >
                          <h4>{card.name}</h4>
                          <button
                            type="button"
                            onClick={() => handleDeleteCard(card.id)}
                            className="button-delete-card"
                          >
                            <img
                              src="/Logo/Logo-delete (1).jpg"
                              alt="Supprimer"
                              className="icon"
                            />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

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
    </DragDropContext>
  );
};

export default CreateList;
