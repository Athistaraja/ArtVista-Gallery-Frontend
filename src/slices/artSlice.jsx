import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Async thunk for fetching art items
export const fetchArtItems = createAsyncThunk('art/fetchArtItems', async () => {
  const response = await axios.get('/art');
  return response.data;
});

export const addArtItem = createAsyncThunk('art/addArtItem', async (newArt) => {
  const response = await axios.post('/art', newArt);
  return response.data;
});

export const updateArtItem = createAsyncThunk('art/updateArtItem', async (updatedArt) => {
  const response = await axios.put(`/art/${updatedArt._id}`, updatedArt);
  return response.data;
});

export const deleteArtItem = createAsyncThunk('art/deleteArtItem', async (artId) => {
  await axios.delete(`/art/${artId}`);
  return artId;
});

const artSlice = createSlice({
  name: 'art',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optional reducers for other art-related actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchArtItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addArtItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateArtItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteArtItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default artSlice.reducer;
