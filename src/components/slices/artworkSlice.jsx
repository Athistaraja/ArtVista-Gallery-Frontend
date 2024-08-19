import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../API';

export const fetchArtworks = createAsyncThunk('artworks/fetchArtworks', async () => {
  const response = await axios.get(`${API}/artist/artwork`);
  return response.data;
});

export const createArtwork = createAsyncThunk('artworks/createArtwork', async (artworkData) => {
  const response = await axios.post(`${API}/artist/artwork/add`, artworkData);
  return response.data;
});

export const updateArtwork = createAsyncThunk('artworks/updateArtwork', async ({ id, updatedData }) => {
  const response = await axios.put(`${API}/artist/artwork/${id}`, updatedData);
  return response.data;
});

export const deleteArtwork = createAsyncThunk('artworks/deleteArtwork', async (id) => {
  await axios.delete(`${API}/artist/artwork/${id}`);
  return id;
});

const artworkSlice = createSlice({
  name: 'artworks',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createArtwork.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateArtwork.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        state.items[index] = action.payload;
      })
      .addCase(deleteArtwork.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default artworkSlice.reducer;
