import "./TablePage.css";
import { useUser } from "../Context/UserContext";
import CreateList from "../components/CreateList/CreateList";

function TablePage() {
  const { user } = useUser();

  return (
    <section className="table-page-section">
      <h2>Vos données ne seront pas enregistré sur se tableau</h2>
      {user ? (
        <p>
          Vous êtes maintenants connecté, vous pouvez créer vos propres tableaux
          dans le menu à gauche
        </p>
      ) : (
        <p>Connecté vous pour pouvoir créer vos propres tableaux</p>
      )}
      <ol className="all-list">
        <CreateList />
      </ol>
    </section>
  );
}

export default TablePage;
