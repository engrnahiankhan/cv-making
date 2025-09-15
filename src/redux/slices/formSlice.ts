import { FormStructure } from "@/types/formTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  step: number;
  data: Partial<FormStructure>;
}

const initialState: FormState = {
  step: 1,
  data: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof FormStructure; value: any }>
    ) => {
      state.data[action.payload.field] = action.payload.value;
    },

    saveStepData: (state, action: PayloadAction<Partial<FormStructure>>) => {
      state.data = { ...state.data, ...action.payload };
    },

    nextStep: (state) => {
      state.step += 1;
    },

    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },

    resetForm: (state) => {
      state.step = 1;
      state.data = {};
    },
  },
});

export const { updateField, saveStepData, nextStep, prevStep, resetForm } =
  formSlice.actions;
export default formSlice.reducer;
