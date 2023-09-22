import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  deleteField,
  Timestamp,
  db,
} from "@/lib/firebase";

/**
 *  Create New Collection
 */
export const createGroup = createAsyncThunk(
  "groups/create",
  async ({ name, user }, thunkAPI) => {
    try {
      const resp = await setDoc(doc(db, user, name), {});
      return resp;
    } catch (error) {
      console.log("Create Group Failed");
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 *  GET all collections of a the authenticated user
 */
export const getCollections = createAsyncThunk(
  "groups/retrieve",
  async ({ user }, thunkAPI) => {
    try {
      // const collectionRef = await ;
      console.log("getCollections", user);
      const snap = await getDocs(collection(db, user));
      const docs = [];
      snap.forEach((doc) => {
        docs.push(doc.id);
      });
      return docs;
    } catch (error) {
      console.log("Retrieve Collections Failed");
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Delete a Collection
 */
export const deleteCollection = createAsyncThunk(
  "groups/delete",
  async ({ name, user }, thunkAPI) => {
    try {
      const resp = await deleteDoc(doc(db, user, name));
      console.log("Delete Collection Successed");
      return resp;
    } catch (error) {
      console.log("Delete Collection Failed");
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Create a new List of tasks under a given Collection
 */
export const createList = createAsyncThunk(
  "lists/create",
  async ({ name, category, user }, thunkAPI) => {
    try {
      // const docRef = await doc(db, user, category, name);
      // const resp = await addDoc(docRef, {});
      const userRef = await collection(db, user);
      const groupRef = await doc(userRef, category);
      const resp = await updateDoc(groupRef, {
        [name]: [],
      });
      console.log("Create List Response", resp);
      return resp;
    } catch (error) {
      console.log("Create List Failed");
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Delete a List of Tasks inside a Collection
 */
export const deleteSubcollection = createAsyncThunk(
  "lists/delete",
  async ({ name, user, category }, thunkAPI) => {
    try {
      const userRef = collection(db, user);
      const groupRef = doc(userRef, category);
      const resp = await updateDoc(groupRef, {
        [name]: deleteField(),
      });
      console.log("Delete SubCollection Successed");
      return resp;
    } catch (error) {
      console.log("Delete SubCollection Failed");
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Retrieve Tasks List's in a Collection
 */
export const getSubCollections = createAsyncThunk(
  "subcollection/retrieve",
  async ({ category, user }, thunkAPI) => {
    try {
      const userRef = collection(db, user);
      const groupRef = doc(userRef, category);

      // Get the document data for the category.
      const docSnap = await getDoc(groupRef);

      if (docSnap.exists()) {
        const categoryData = docSnap.data();
        console.log(categoryData);

        // Extract all lists from the category data.
        const lists = Object.keys(categoryData).map((listName) => ({
          listName,
          items: categoryData[listName],
        }));

        console.log("Lists Data:", lists);
        return lists;
      } else {
        console.log("Category not found.");
        return thunkAPI.rejectWithValue("Category not found.");
      }
    } catch (error) {
      console.log("Retrieve Tasks Lists Failed");
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 *  Delete a Task from a specific List
 */
export const deleteTask = createAsyncThunk(
  "task/delete",
  async ({ user, category, listName, task }, thunkAPI) => {
    try {
      // Reference to the user's category.
      const userRef = collection(db, user);
      const groupRef = doc(userRef, category);

      // Use arrayRemove to remove the item from the list.
      const resp = await updateDoc(groupRef, {
        [listName]: arrayRemove(task),
      });

      console.log("Item deleted successfully.");
      console.log(resp);
      return resp;
    } catch (error) {
      console.log("Delete Item Failed");
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 *  Create a New Task
 */
export const createTask = createAsyncThunk(
  "task/create",
  async ({ user, category, listName, task }, thunkAPI) => {
    try {
      // Reference to the user's category.
      const userRef = collection(db, user);
      const groupRef = doc(userRef, category);
      const myTask = {
        ...task,
        "created-at": Timestamp.fromDate(new Date()),
      };

      // Use arrayRemove to remove the item from the list.
      const resp = await updateDoc(groupRef, {
        [listName]: arrayUnion(myTask),
      });

      console.log("Item Created successfully.");
      console.log(resp);
      return resp;
    } catch (error) {
      console.log("Create New Item Failed");
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 *  Update a Task
 */
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ user, category, listName, task, oldTask }, thunkAPI) => {
    try {
      console.log("First Step: Remove the old item from the list");
      console.log(
        "Second Step: Adding the New Task with the updated data to the list"
      );
      // Reference to the user's category.
      const userRef = collection(db, user);
      const groupRef = doc(userRef, category);

      // Use arrayRemove to remove the item from the list.
      try {
        const resp = await updateDoc(groupRef, {
          [listName]: arrayRemove(oldTask),
        });
        console.log("First Step: Successfully");
        try {
          // Use arrayRemove to remove the item from the list.
          await updateDoc(groupRef, {
            [listName]: arrayUnion(task),
          });
          console.log("Second Step: Successfully");
        } catch (error) {
          console.log("Second Step Failed");
          console.error(error);
          return thunkAPI.rejectWithValue(error.message);
        }
        return resp;
      } catch (error) {
        console.log("First Step Failed");
        console.error(error);
        return thunkAPI.rejectWithValue(error.message);
      }
    } catch (error) {
      console.log("Create New Item Failed");
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  created: false,
  deleted: null,
  error: null,
  groups: null,
  subCollections: null,
};

const groupSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    getGroups: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    claerSubCollections: (state, action) => {
      state.subCollections = null;
    },
    clearState: (state) => {
      state.loading = false;
      state.created = false;
      state.deleted = null;
      state.error = null;
      state.groups = null;
      state.subCollections = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Creating New Group Reducer
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.createGrouped = true;
        state.groups = null;
        state.error = null;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.createGrouped = false;
      })
      // Fetching Collections Reducer
      .addCase(getCollections.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
        state.error = null;
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.groups = null;
      })
      // Delete Collection Reducer
      .addCase(deleteCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.deleted = true;
        state.groups = null;
        state.error = null;
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.deleted = false;
      })
      // Creating new List Reducer
      .addCase(createList.pending, (state) => {
        state.loading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.loading = false;
        state.subCollections = null;
        state.error = null;
      })
      .addCase(createList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      // fetch the lists of tasks inside a collection/category
      .addCase(getSubCollections.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.subCollections = action.payload;
        state.error = null;
      })
      .addCase(getSubCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      // Delete SubCollection Reducer
      .addCase(deleteSubcollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubcollection.fulfilled, (state, action) => {
        state.loading = false;
        state.deleted = true;
        state.subCollections = null;
        state.error = null;
      })
      .addCase(deleteSubcollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.deleted = false;
      })
      // Create a New Task Reducer
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.subCollections = null;
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      // Updating an existing Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.subCollections = null;
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      // Deleting an existing task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.subCollections = null;
        state.deleted = true;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.deleted = false;
        state.error = action.error;
      });
  },
});

export const { getGroups, claerSubCollections, clearState } =
  groupSlice.actions;
const groupReducer = groupSlice.reducer;
export default groupReducer;
