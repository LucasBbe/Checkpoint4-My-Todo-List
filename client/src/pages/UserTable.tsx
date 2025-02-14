import "./UserTable.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateListCard from "../components/CreateListCard.tsx/CreateListCard";

interface Table {
  id: number;
  name: string;
  user_id: number;
}

function UserTablePage() {
  const { id } = useParams();
  const [table, setTable] = useState<Table | null>(null);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/table/${id}`,
        );
        if (res.ok) {
          const data = await res.json();
          setTable(data);
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };

    fetchTable();
  }, [id]);

  if (!table) return <p>Chargement...</p>;

  return (
    <section className="table-page-section">
      <h1>{table.name}</h1>
      <ol className="all-list">
        <CreateListCard tableId={table.id} />
      </ol>
    </section>
  );
}

export default UserTablePage;
