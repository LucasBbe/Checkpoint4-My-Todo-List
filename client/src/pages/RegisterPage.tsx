import "./RegisterPage.css";
import { ToastContainer } from "react-toastify";
import Register from "../components/Register/Register";

function RegisterPage() {
  return (
    <section>
      <ToastContainer />
      <Register />
    </section>
  );
}

export default RegisterPage;
