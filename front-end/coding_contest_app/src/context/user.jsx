import { createContext, useContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import showSwalAlert from "../utilities/AlertComponents";


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
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      showSwalAlert({ icon: "success", title: "Account Created", text: `Welcome, ${name}!` });
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
