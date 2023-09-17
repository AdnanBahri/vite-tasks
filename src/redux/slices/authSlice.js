import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addDoc,
  app,
  auth,
  collection,
  createUserWithEmailAndPassword,
  signOut,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
} from "@/lib/firebase";

const initialState = {
  loading: false,
  error: null,
  registered: false,
  isAuthenticated: false,
};

export const register = createAsyncThunk(
  "users/register",
  async ({ email, password }, thunkAPI) => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      const user = resp?.user;

      await setDoc(doc(db, "tasks", user.email), { todos: [] });
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
      return resp;
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

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.registered = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.registered = true;
        // state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.registered = null;
        // state.user = initialState.user;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { resetRegistered, setAuthStatus } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
