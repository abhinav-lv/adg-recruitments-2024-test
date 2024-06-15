"use client";
import { auth } from "@/lib/firebase/config";
import { useContext, createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { IAuthContext } from "@/lib/types";

const AuthContext = createContext<IAuthContext>({
  user: "loading",
  googleSignIn: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<IAuthContext["user"]>("loading");

  // login function
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  // logout function
  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
