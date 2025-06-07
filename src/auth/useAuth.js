import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const isAdmin = currentUser.email === "admin@example.com";
        setUser({ ...currentUser, isAdmin });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
