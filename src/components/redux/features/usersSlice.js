import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetch users
export const fetchUser = createAsyncThunk("user/getUsers", async () => {
  const response = await fetch("https://dummyjson.com/users/");
  const data = await response.json();

  return data.users;
});

// add users

export const addUsers = createAsyncThunk("uses/add", async (formData) => {
  const response = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return response.json();
});

// deleted users
export const DeleteUser = createAsyncThunk("user", async (id) => {
  await fetch(`https://dummyjson.com/users/${id}`, { method: "DELETE" });
  return id;
});
const userApi = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.error = "Something Went Wrong ! during fetch api ";
        state.loading = false;
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload);
      });
  },
});

export default userApi.reducer;
