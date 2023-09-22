import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  auth,
  createUserWithEmailAndPassword,
  signOut,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
} from "@/lib/firebase";

export const signInWithGoogle = createAsyncThunk(
  "google-signin",
  async (_, thunkAPI) => {
    try {
      const resp = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(resp);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = resp.user;
      console.log("user", user);
      await Promise.all([
        setDoc(doc(db, resp?.user?.email, "Health"), {}),
        setDoc(doc(db, resp?.user?.email, "Education"), {}),
        setDoc(doc(db, resp?.user?.email, "Food"), {}),
      ]);

      console.log("Sign In With Google:", resp);
      return resp?.user?.email;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "users/register",
  async ({ email, password }, thunkAPI) => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      const user = resp?.user;

      await Promise.all([
        setDoc(doc(db, user.email, "Health"), {}),
        setDoc(doc(db, user.email, "Education"), {}),
        setDoc(doc(db, user.email, "Food"), {}),
      ]);
      console.log("Register");
      console.log(user);
      return user;
    } catch (error) {
      console.log("Register");
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async ({ email, password }, thunkAPI) => {
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      // const resp = await signInWithEmailAndPassword(auth, email, password);

      console.log("Slice Login:", resp);
      return resp?.user?.email;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    const resp = await signOut(auth);
    console.log(resp);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  user: null,
  loading: false,
  error: null,
  registered: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.registered = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.registered = true;
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = true;
        state.error = null;
        state.user = action.payload.email;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.registered = false;
        state.error = action.error;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.registered = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { resetRegistered, setAuthStatus, setUser, clearAuth } =
  authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
