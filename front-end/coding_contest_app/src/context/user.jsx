import { createContext, useContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import showSwalAlert from "../utilities/AlertComponents";
import {sendData} from "../host/apis/ApiRequests";
import {BASE_SERVER_URL, AUTH_ENDPOINT} from "../Constants";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      showSwalAlert({ icon: "success", title: "Login Successful", text: "You have been logged in!" });
      return userCredential;
    } catch (error) {
      showSwalAlert({ icon: "error", title: error.code, text: error.message });
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setUser(null);
      showSwalAlert({ icon: "success", title: "Logged Out", text: "You have been logged out successfully!" });
    } catch (error) {
      showSwalAlert({ icon: "error", title: error.code, text: error.message });
    }
  }

  async function signup(email, password, name) {
    const baseUrl = BASE_SERVER_URL + AUTH_ENDPOINT + "signup/"
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const signupData = new FormData();
      signupData.append("user_id", "userCredential.user.uid")
      signupData.append("emsil", email)
      signupData.append("name", name)
      await sendData(baseUrl, signupData)
      return userCredential;
    } catch (error) {
      console.log("error", error)
      showSwalAlert({ icon: "error", title: error.code, text: error.message });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        showSwalAlert({ icon: "success", title: "Welcome!", text: "You are already logged in." });
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, signup }}>
      {props.children}
    </UserContext.Provider>
  );
}
