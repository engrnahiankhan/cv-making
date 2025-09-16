import {
  FormStructure,
  SkillAndExperience,
  Education,
} from "@/types/formTypes";
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
    updateField: <K extends keyof FormStructure>(
      state: FormState,
      action: PayloadAction<{ field: K; value: FormStructure[K] }>
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

    initializeForm: (state) => {
      state.data = {
        id: Date.now(),
        slug: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        country: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        job_title: "",
        job_description: "",
        skill_and_experience: [
          {
            id: Date.now(),
            job_title: "",
            start_date: "",
            end_date: "",
            company_name: "",
            job_description: "",
            achievements: "",
            skill: [],
          },
        ],
        education_and_certifications: {
          education: [
            {
              id: Date.now(),
              degree: "",
              institution_name: "",
              major: "",
              start_date: "",
              end_date: "",
              achievements: "",
            },
          ],
          certifications: [
            {
              id: Date.now(),
              certification_title: "",
              issuing_organization: "",
              issue_date: "",
              expiration_date: "",
            },
          ],
        },
        contact_information: {
          linkedin_profile: "",
          portfolio_website: "",
          other_social_media: [],
          other_social_media_links: "",
        },
      };
    },

    addNewWorkExperience: (state) => {
      if (!state.data.skill_and_experience) {
        state.data.skill_and_experience = [];
      }

      const newExperience: SkillAndExperience = {
        id: Date.now(),
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
        id: Date.now(),
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
        id: Date.now(),
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
  },
});

export const {
  updateField,
  saveStepData,
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
} = formSlice.actions;

export default formSlice.reducer;
