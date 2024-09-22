import ApplicationRouter from "./Router";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer/>
      <ApplicationRouter />
    </div>
  );
}

export default App;
