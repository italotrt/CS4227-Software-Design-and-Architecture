import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

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
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users: User[] = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() } as User);
  });
  return users;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
  const userRef = doc(db, 'users', user.id);
  const userData = { ...user };
  await updateDoc(userRef, userData);
  return user;
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
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default usersSlice.reducer;