import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../redux/slices/authSlice";

const useAuth = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch(setAuthStatus(true));
      else dispatch(setAuthStatus(false));
    });

    return () => {
      // Unsubscribe from the auth state change listener when the component unmounts
      unsubscribe();
    };
  }, [auth]);
};

export default useAuth;
