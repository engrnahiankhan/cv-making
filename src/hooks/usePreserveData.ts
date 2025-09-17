import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { setItem } from "@/utils/localStorage";
import { initializeForm, stateUpdateAction } from "@/redux/slices/formSlice";
import { loadFromLocalStorage } from "@/redux/actions/localStorageAction";
import { initialFormData } from "@/utils/initialForm";

const usePreserveData = (key: string) => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector((state) => state.form);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const localData = loadFromLocalStorage();

    if (!localData || Object.keys(localData).length === 0) {
      dispatch(initializeForm());

      const initialData = {
        step: 1,
        data: initialFormData(),
        toggleEducationAndCertifications: "education",
      };
      setItem(key, JSON.stringify(initialData));
    } else {
      dispatch(stateUpdateAction(localData));
    }
  }, [dispatch, key]);

  // Persist to localStorage whenever formState changes
  useEffect(() => {
    setItem(key, JSON.stringify(formState));
  }, [formState, key]);
};

export default usePreserveData;
