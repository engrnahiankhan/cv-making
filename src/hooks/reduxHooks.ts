import { AppDispatch, RootState } from "@/redux/store";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
