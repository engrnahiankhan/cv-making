import { createProfileUrl } from "@/config/api.config";
import { FormStructureType } from "@/types/formTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FormData {
  formData: FormStructureType;
}
export const createProfileAction = createAsyncThunk(
  "aiResume/createProfile",
  async ({ formData }: FormData) => {
    const url = createProfileUrl;
    const res = await axios.post(url, formData);
    return res.data;
  }
);
