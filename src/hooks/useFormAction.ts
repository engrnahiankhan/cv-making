"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/redux/store";
import {
  updatePersonalInfoAction,
  updateCareerSummaryAction,
  updateSkillExperienceAction,
  updateEducationAction,
  updateCertificationAction,
  updateContactInfoAction,
  deleteSkillExperienceAction,
  deleteEducationAction,
  deleteCertificationAction,
  nextStepAction,
  prevStepAction,
  resetFormDataAction,
  addSkillExperienceAction,
  addEducationAction,
  addCertificationAction,
  updateToggleAction,
} from "@/redux/slices/formSlice";
import {
  PersonalInfoType,
  CareerSummaryType,
  ContactInformationType,
  SkillAndExperienceType,
  EducationType,
  CertificationType,
} from "@/types/formTypes";

export const useFormActions = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector((state: RootState) => state.form);

  /** ---------- Top-level updates ---------- */
  const updatePersonalInfo = (field: keyof PersonalInfoType, value: string) => {
    dispatch(updatePersonalInfoAction({ [field]: { value } }));
  };

  const updateCareerSummary = (
    field: keyof CareerSummaryType,
    value: string
  ) => {
    dispatch(updateCareerSummaryAction({ [field]: { value } }));
  };

  const updateContactInfo = (
    field: keyof ContactInformationType,
    value: string
  ) => {
    dispatch(updateContactInfoAction({ [field]: { value } }));
  };

  /** ---------- Array item updates ---------- */
  const updateSkillExperience = (
    id: number,
    data: Partial<SkillAndExperienceType>
  ) => {
    dispatch(updateSkillExperienceAction({ id, data }));
  };

  const updateEducation = (id: number, data: Partial<EducationType>) => {
    dispatch(updateEducationAction({ id, data }));
  };

  const updateCertification = (
    id: number,
    data: Partial<CertificationType>
  ) => {
    dispatch(updateCertificationAction({ id, data }));
  };

  /** ---------- Array item delete ---------- */
  const deleteSkillExperience = (id: number) =>
    dispatch(deleteSkillExperienceAction(id));

  const deleteEducation = (id: number) => dispatch(deleteEducationAction(id));

  const deleteCertification = (id: number) =>
    dispatch(deleteCertificationAction(id));

  /** ---------- Step navigation ---------- */
  const nextStep = () => dispatch(nextStepAction());
  const prevStep = () => dispatch(prevStepAction());

  /** ---------- Reset & Slug ---------- */
  const resetForm = () => dispatch(resetFormDataAction());

  /** ---------- Add new array item ---------- */
  const addSkillExperience = () => dispatch(addSkillExperienceAction());
  const addEducation = () => dispatch(addEducationAction());
  const addCertification = () => dispatch(addCertificationAction());

  const updateToggle = (type: "education" | "certificate") => {
    dispatch(updateToggleAction(type));
  };

  return {
    formState,
    updatePersonalInfo,
    updateCareerSummary,
    updateContactInfo,
    updateSkillExperience,
    updateEducation,
    updateCertification,
    deleteSkillExperience,
    deleteEducation,
    deleteCertification,
    nextStep,
    prevStep,
    resetForm,
    updateToggle,
    addSkillExperience,
    addEducation,
    addCertification,
  };
};
