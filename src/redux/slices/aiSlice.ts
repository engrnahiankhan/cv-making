import { createSlice } from "@reduxjs/toolkit";
import { createProfileAction } from "../actions/aiActions";

const initialState = {
  data: {},
  is_error: false,
  is_loading: false,
  message: "",
};

const aiSlice = createSlice({
  name: "aiSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createProfileAction.pending, (state) => {
        state.is_loading = true;
        state.is_error = false;
      })
      .addCase(createProfileAction.fulfilled, (state, action) => {
        console.log("check api fulfilled data:", action);

        state.is_loading = false;
        state.is_error = false;
        state.data = action.payload;
      })
      .addCase(createProfileAction.rejected, (state, action) => {
        console.log("check api error:", action);

        state.is_loading = false;
        state.is_error = true;
        state.message = "Failed";
      });
  },
});

export default aiSlice.reducer;
