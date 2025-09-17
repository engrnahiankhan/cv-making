import {
  FormStructure,
  SkillAndExperience,
  Education,
} from "@/types/formTypes";
import { initialFormData } from "@/utils/initialForm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  step: number;
  data: Partial<FormStructure>;
  toggleEducationAndCertifications: "education" | "certifications";
}

const initialState: FormState = {
  step: 1,
  data: {},
  toggleEducationAndCertifications: "education",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    stateUpdateAction(state, action: PayloadAction<Partial<FormState>>) {
      Object.assign(state, action.payload);
    },
    updateField: <K extends keyof FormStructure>(
      state: FormState,
      action: PayloadAction<{ field: K; value: FormStructure[K] }>
    ) => {
      state.data[action.payload.field] = action.payload.value;
    },

    updateSlugAction(state, action: PayloadAction<string | undefined>) {
      if (!state.data) state.data = {};
      state.data.slug = action.payload;
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

    initializeForm: (state) => {
      state.data = initialFormData();
    },

    addNewWorkExperience: (state) => {
      if (!state.data.skill_and_experience) {
        state.data.skill_and_experience = [];
      }

      const newExperience: SkillAndExperience = {
        id: Date.now() + Math.random(),
        job_title: "",
        start_date: "",
        end_date: "",
        company_name: "",
        job_description: "",
        achievements: "",
        skill: [],
      };

      state.data.skill_and_experience.push(newExperience);
    },

    addNewEducation: (state) => {
      if (!state.data.education_and_certifications) {
        state.data.education_and_certifications = {
          education: [],
          certifications: [],
        };
      }
      state.data.education_and_certifications.education.push({
        id: Date.now() + Math.random(),
        degree: "",
        institution_name: "",
        major: "",
        start_date: "",
        end_date: "",
        achievements: "",
      });
    },

    addNewCertificate: (state) => {
      if (!state.data.education_and_certifications) {
        state.data.education_and_certifications = {
          education: [],
          certifications: [],
        };
      }
      state.data.education_and_certifications.certifications.push({
        id: Date.now() + Math.random(),
        certification_title: "",
        issuing_organization: "",
        issue_date: "",
        expiration_date: "",
      });
    },

    updateEducationForm: (
      state,
      action: PayloadAction<{
        id: number;
        field: keyof Education;
        value: string;
      }>
    ) => {
      const educationList = state.data.education_and_certifications?.education;
      if (!educationList) return;

      const edu = educationList.find((e) => e.id === action.payload.id);
      if (edu) {
        edu[action.payload.field] = action.payload.value as never;
      }
    },

    updateCertificateForm: (
      state,
      action: PayloadAction<{
        id: number;
        field:
          | "certification_title"
          | "issuing_organization"
          | "issue_date"
          | "expiration_date";
        value: string;
      }>
    ) => {
      const certList = state.data.education_and_certifications?.certifications;
      if (!certList) return;

      const cert = certList.find((c) => c.id === action.payload.id);
      if (cert) {
        cert[action.payload.field] = action.payload.value;
      }
    },

    updateSkillExperienceForm: (
      state,
      action: PayloadAction<{
        id: number;
        field: keyof SkillAndExperience;
        value: string | string[];
      }>
    ) => {
      const expList = state.data.skill_and_experience;
      if (!expList) return;

      const exp = expList.find((e) => e.id === action.payload.id);
      if (exp) {
        exp[action.payload.field] = action.payload.value as never;
      }
    },

    updateContactInformation: (
      state,
      action: PayloadAction<{
        field: keyof FormStructure["contact_information"];
        value: string;
      }>
    ) => {
      if (!state.data.contact_information) {
        state.data.contact_information = {
          linkedin_profile: "",
          portfolio_website: "",
          other_social_media: "",
          other_social_media_links: "",
        };
      }

      const { field, value } = action.payload;
      state.data.contact_information[field] = value;
    },

    updateWorkExperienceDate: (
      state,
      action: PayloadAction<{
        id: number;
        field: "start_date" | "end_date";
        value: string;
      }>
    ) => {
      const { id, field, value } = action.payload;
      if (!state.data.skill_and_experience) return;

      const experience = state.data.skill_and_experience.find(
        (exp) => exp.id === id
      );
      if (experience) {
        experience[field] = value;
      }
    },

    updateEducationDate: (
      state,
      action: PayloadAction<{
        id: number;
        field: "start_date" | "end_date";
        value: string;
      }>
    ) => {
      const { id, field, value } = action.payload;
      if (!state.data.education_and_certifications) return;

      const education = state.data.education_and_certifications.education.find(
        (edu) => edu.id === id
      );
      if (education) {
        education[field] = value;
      }
    },

    updateCertificationDate: (
      state,
      action: PayloadAction<{
        id: number;
        field: "issue_date" | "expiration_date";
        value: string;
      }>
    ) => {
      const { id, field, value } = action.payload;
      if (!state.data.education_and_certifications) return;

      const certification =
        state.data.education_and_certifications.certifications.find(
          (cert) => cert.id === id
        );
      if (certification) {
        certification[field] = value;
      }
    },

    toggleEducationAndCertificationsAction: (
      state,
      action: PayloadAction<"education" | "certifications">
    ) => {
      state.toggleEducationAndCertifications = action.payload;
    },
  },
});

export const {
  stateUpdateAction,
  updateField,
  updateSlugAction,
  nextStep,
  prevStep,
  resetForm,
  initializeForm,
  addNewWorkExperience,
  addNewEducation,
  addNewCertificate,
  updateEducationForm,
  updateCertificateForm,
  updateSkillExperienceForm,
  updateContactInformation,
  updateWorkExperienceDate,
  updateEducationDate,
  updateCertificationDate,
  toggleEducationAndCertificationsAction,
} = formSlice.actions;

export default formSlice.reducer;
