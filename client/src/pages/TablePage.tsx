import "./TablePage.css";
import CreateList from "../components/CreateList/CreateList";

function TablePage() {
  return (
    <section className="table-page-section">
      <h2>Vos données ne seront pas enregistré si vous n'êtes pas connecté</h2>
      <ol className="all-list">
        <CreateList />
      </ol>
    </section>
  );
}

export default TablePage;
