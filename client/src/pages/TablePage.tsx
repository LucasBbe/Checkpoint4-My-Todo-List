import "./TablePage.css";
import CreateList from "../components/CreateList/CreateList";

function TablePage() {
  return (
    <section className="table-page-section">
      <ol>
        <CreateList />
      </ol>
    </section>
  );
}

export default TablePage;
