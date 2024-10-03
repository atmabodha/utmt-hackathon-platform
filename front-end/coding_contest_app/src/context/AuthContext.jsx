import { createContext, useState, useEffect } from "react";
import { BASE_SERVER_URL, AUTH_ENDPOINT } from "../Constants";
import { sendData, getData} from "../host/apis/ApiRequests";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const baseUrl = BASE_SERVER_URL + AUTH_ENDPOINT
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await getData(baseUrl + "me/");
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const formDataToSend = new FormData();
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);

    const res = await sendData(baseUrl + "login/", formDataToSend);
    const data = await res.json();
    if (data.status === "success") {
      setUser(data.user);
      localStorage.setItem('session_id', data.session_id);
    } else {
      console.error(data.message);
    }
  };

  const signup = async (email, password, name) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);

    const url = BASE_SERVER_URL + AUTH_ENDPOINT + "signup/";

    try {
      const response = await sendData(url, formDataToSend);
            
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const logout = async () => {
    const formDataToSend = new FormData()
    const session_id = localStorage.getItem('session_id');
    formDataToSend.append("session_id", session_id)

    if (!session_id) {
      console.error('No session ID found');
      return;
    }
    await sendData(baseUrl + "logout/", formDataToSend);
    localStorage.removeItem('session_id');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
