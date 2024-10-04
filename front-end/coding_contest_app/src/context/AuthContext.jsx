import { createContext, useState, useEffect } from "react";
import { BASE_SERVER_URL, AUTH_ENDPOINT } from "../Constants";
import { sendData, getData } from "../host/apis/ApiRequests";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const baseUrl = BASE_SERVER_URL + AUTH_ENDPOINT;
  const session_id = localStorage.getItem("session_id");

  useEffect(() => {
    const formDataToSend = new FormData();
    formDataToSend.append("session_id", session_id)
    const checkUser = async () => {
        const response = await getData(baseUrl + "me/");
        if(response){
          const data = response.data;
          console.log("data, ", data)
          if (data.user) {
            setUser(data.user);
          }
        }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const formDataToSend = new FormData();
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);

    try {
      const res = await sendData(baseUrl + "login/", formDataToSend);
      if (res) {
        const data = await res.data;

        if (data.status === "success") {
          setUser(data.session);
          localStorage.setItem("session_id", data.session_id);
        }
        return data;
      }
    } catch (error) {
      console.error("Login failed:", error);
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
      if (response) {
        const data = await response.data;
        if (data.status === "success") {
          setUser(data.session);
        }
        return data;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const logout = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("session_id", session_id);

    if (!session_id) {
      console.error("No session ID found");
      return;
    }
    await sendData(baseUrl + "logout/", formDataToSend);
    localStorage.removeItem("session_id");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
