import { getItem } from "@/utils/localStorage";
import { FormState } from "../slices/formSlice";

export const loadFromLocalStorage = (): FormState | null => {
  const saved = getItem("formState");
  return saved ? JSON.parse(saved) : null;
};
