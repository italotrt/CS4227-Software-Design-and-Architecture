import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users: User[] = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Assign Firestore document ID to the user
          ...doc.data(),
      })) as User[];

      console.log("Fetched users:", users);
      return users;
  } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
  }
});


export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
  try {
      if (!user.id) throw new Error("User ID is missing");

      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, { 
          name: user.name, 
          role: user.role, 
          status: user.status 
      });

      console.log("User updated in Firestore:", user);
      return user;
  } catch (error) {
      console.error("Error updating user:", error);
      throw error;
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
    return userId;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.payload.id);
        if (user) {
            user.status = action.payload.status;
            user.name = action.payload.name;
            user.role = action.payload.role;
        }
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
            state.users[index] = action.payload;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
