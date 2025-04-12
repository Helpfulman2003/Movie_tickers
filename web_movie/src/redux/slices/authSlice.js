import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, logoutApi } from "../../api/authApi"; // Thêm hàm logoutApi

// Async thunks để gọi API
export const signIn = createAsyncThunk('auth/signIn', async (credentials, { rejectWithValue }) => {
  try {
    const response = await login(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const response = await register(userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await logoutApi(); // Gọi API logout
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Tạo slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái khi gọi signIn
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload.employee;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý trạng thái khi gọi signUp
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload.newEmployee;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý trạng thái khi gọi logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.auth = null; // Xóa thông tin người dùng
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;