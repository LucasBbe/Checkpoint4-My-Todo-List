import "./LoginPage.css";
import { ToastContainer } from "react-toastify";
import Login from "../components/Login/Login";

function LoginPage() {
  return (
    <section>
      <ToastContainer />
      <Login />
    </section>
  );
}

export default LoginPage;
