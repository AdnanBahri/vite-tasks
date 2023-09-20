import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearAuth, setAuthStatus, setUser } from "../redux/slices/authSlice";
import { clearState } from "../redux/slices/groupSclice";

const useAuth = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthStatus(true));
        dispatch(setUser(user.email));
      } else {
        dispatch(clearAuth());
        dispatch(clearState());
      }
    });

    return () => {
      // Unsubscribe from the auth state change listener when the component unmounts
      unsubscribe();
    };
  }, [auth]);
};

export default useAuth;
