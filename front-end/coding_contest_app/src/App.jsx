import ApplicationRouter from "./Router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <ToastContainer />
        <ApplicationRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
