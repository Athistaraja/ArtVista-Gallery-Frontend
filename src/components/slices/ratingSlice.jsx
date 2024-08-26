import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../API'; // Ensure API URL is correct

export const updateRating = createAsyncThunk(
  'ratings/updateRating',
  async ({ artworkId, rating }, { getState }) => {
    const state = getState();
    const token = state.auth.token; // Assuming token is stored in auth slice

    const config = {
      headers: {
        'x-auth-token': `Bearer ${token}`, // Attach token to headers
      },
    };

    try {
      const response = await axios.patch(
        `${API}/artwork/${artworkId}/rating`,
        { rating },
        config
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update rating:', error);
      throw error;
    }
  }
);

const ratingSlice = createSlice({
  name: 'ratings',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateRating.fulfilled, (state, action) => {
        // Handle successful update
      })
      .addCase(updateRating.rejected, (state, action) => {
        console.error('Update rating failed:', action.error.message);
      });
  },
});

export default ratingSlice.reducer;
