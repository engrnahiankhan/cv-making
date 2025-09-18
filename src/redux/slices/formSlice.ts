import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CommonFieldType,
  FormStructureType,
  PersonalInfoType,
  CareerSummaryType,
  SkillAndExperienceType,
  EducationType,
  CertificationType,
  ContactInformationType,
} from "@/types/formTypes";
import {
  certification,
  education,
  initialFormData,
  skillAndExperience,
} from "@/utils/initialForm";

// helper type: partial updates for nested CommonFieldType fields
type PartialFieldUpdates<T> = {
  [K in keyof T]?: Partial<T[K]>;
};

// slice state
export interface FormState {
  currentStep: number;
  formData: FormStructureType;
  toggleEducationAndCertifications: "education" | "certificate";
}

const MAX_STEP = 7;

const initialState: FormState = {
  currentStep: 1,
  formData: initialFormData(),
  toggleEducationAndCertifications: "education",
};

/* ------------------ Type guards & validators ------------------ */

function isCommonField(x: unknown): x is CommonFieldType<unknown> {
  return (
    typeof x === "object" &&
    x !== null &&
    "value" in (x as object) &&
    "error" in (x as object) &&
    "require" in (x as object)
  );
}

/** set error on a single field (special-cases on key names like email/phone/url/zip) */
function validateField(field: CommonFieldType<unknown>, key?: string): void {
  // if not required -> clear error
  if (!field.require) {
    field.error = "";
    return;
  }

  const val = field.value;

  // array case (skills etc)
  if (Array.isArray(val)) {
    field.error = val.length === 0 ? "This field is required" : "";
    return;
  }

  const str = typeof val === "string" ? val.trim() : String(val ?? "").trim();

  if (!str) {
    field.error = "This field is required";
    return;
  }

  // key specific checks
  if (key) {
    const k = key.toLowerCase();

    // email
    if (k.includes("email")) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(str)) {
        field.error = "Please enter a valid email address";
        return;
      }
    }

    // phone
    if (k.includes("phone")) {
      // allow + and 7-15 digits
      const phoneRe = /^\+?\d{7,15}$/;
      if (!phoneRe.test(str)) {
        field.error = "Please enter a valid phone number";
        return;
      }
    }

    // zip code
    if (k.includes("zip")) {
      const zipRe = /^\d{3,10}$/;
      if (!zipRe.test(str)) {
        field.error = "Please enter a valid ZIP/postal code";
        return;
      }
    }

    // simple URL check for links / websites / portfolio / linkedin / social
    if (
      k.includes("linkedin") ||
      k.includes("portfolio") ||
      k.includes("website") ||
      k.includes("social") ||
      k.includes("url")
    ) {
      try {
        new URL(str);
      } catch {
        field.error = "Please enter a valid URL (include https://)";
        return;
      }
    }
  }

  // default: OK
  field.error = "";
}

/** Validate any object that may contain CommonFieldType properties (works with typed objects that also have other props like id) */
function validateObject<T extends object>(obj: T): void {
  const rec = obj as Record<string, unknown>;

  // validate each field that looks like CommonFieldType
  for (const key in rec) {
    const value = rec[key];
    if (isCommonField(value)) {
      validateField(value, key);
    }
  }

  // cross-field checks (common: start_date/end_date)
  const start = rec["start_date"];
  const end = rec["end_date"];
  if (isCommonField(start) && isCommonField(end)) {
    const s =
      typeof start.value === "string"
        ? start.value.trim()
        : String(start.value ?? "").trim();
    const e =
      typeof end.value === "string"
        ? end.value.trim()
        : String(end.value ?? "").trim();
    if (s && e) {
      const sd = Date.parse(s);
      const ed = Date.parse(e);
      if (!Number.isNaN(sd) && !Number.isNaN(ed) && sd > ed) {
        start.error = "Start date must be before end date";
        end.error = "End date must be after start date";
      }
    }
  }
}

/** Check all CommonFieldType fields inside an object are error-free */
function allFieldsValid<T extends object>(obj: T): boolean {
  const rec = obj as Record<string, unknown>;
  for (const key in rec) {
    const v = rec[key];
    if (isCommonField(v) && v.error !== "") return false;
  }
  return true;
}

/* ------------------ step validation ------------------ */

function validateStep(formData: FormStructureType, step: number): boolean {
  switch (step) {
    case 1: {
      validateObject(formData.personal_information);
      return allFieldsValid(formData.personal_information);
    }
    case 2: {
      validateObject(formData.career_summary);
      return allFieldsValid(formData.career_summary);
    }
    case 3: {
      // skill_and_experience is array of items (each item has id + fields)
      for (const item of formData.skill_and_experience) {
        validateObject(item);
      }
      return formData.skill_and_experience.every((item) => {
        // check all CommonFieldType fields inside item
        return allFieldsValid(item);
      });
    }
    case 4: {
      for (const item of formData.education) {
        validateObject(item);
      }
      return formData.education.every((item) => allFieldsValid(item));
    }
    case 5: {
      for (const item of formData.certifications) {
        validateObject(item);
      }
      return formData.certifications.every((item) => allFieldsValid(item));
    }
    case 6: {
      validateObject(formData.contact_information);
      return allFieldsValid(formData.contact_information);
    }
    default:
      return true;
  }
}

/* ------------------ slice ------------------ */

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    /* ---------- InitializeFormData and State update action ---------- */
    initializeFormData: (state) => {
      state.formData = initialFormData();
    },

    stateUpdateAction(state, action: PayloadAction<Partial<FormState>>) {
      Object.assign(state, action.payload);
    },

    /* ---------- update top-level field groups (partial updates allowed) ---------- */
    updatePersonalInfoAction(
      state,
      action: PayloadAction<PartialFieldUpdates<PersonalInfoType>>
    ) {
      const updates = action.payload;
      for (const key in updates) {
        const upd = updates[key as keyof PersonalInfoType];
        if (!upd) continue;
        const target =
          state.formData.personal_information[key as keyof PersonalInfoType];
        if (isCommonField(target)) {
          // assign allowed partials (value / error / require)
          Object.assign(target, upd as Partial<CommonFieldType<unknown>>);
        }
      }
      validateObject(state.formData.personal_information);
    },

    updateCareerSummaryAction(
      state,
      action: PayloadAction<PartialFieldUpdates<CareerSummaryType>>
    ) {
      const updates = action.payload;
      for (const key in updates) {
        const upd = updates[key as keyof CareerSummaryType];
        if (!upd) continue;
        const target =
          state.formData.career_summary[key as keyof CareerSummaryType];
        if (isCommonField(target)) {
          Object.assign(target, upd as Partial<CommonFieldType<unknown>>);
        }
      }
      validateObject(state.formData.career_summary);
    },

    updateContactInfoAction(
      state,
      action: PayloadAction<PartialFieldUpdates<ContactInformationType>>
    ) {
      const updates = action.payload;
      for (const key in updates) {
        const upd = updates[key as keyof ContactInformationType];
        if (!upd) continue;
        const target =
          state.formData.contact_information[
            key as keyof ContactInformationType
          ];
        if (isCommonField(target)) {
          Object.assign(target, upd as Partial<CommonFieldType<unknown>>);
        }
      }
      validateObject(state.formData.contact_information);
    },

    /* ---------- update specific array item (skill/education/certification) ---------- */
    updateSkillExperienceAction(
      state,
      action: PayloadAction<{
        id: number;
        data: PartialFieldUpdates<SkillAndExperienceType>;
      }>
    ) {
      const { id, data } = action.payload;
      const index = state.formData.skill_and_experience.findIndex(
        (it) => it.id === id
      );
      if (index === -1) return;
      const item = state.formData.skill_and_experience[index];

      for (const key in data) {
        const upd = data[key as keyof SkillAndExperienceType];
        if (!upd) continue;
        const target = (item as Record<string, unknown>)[key];
        if (isCommonField(target)) {
          Object.assign(target, upd as Partial<CommonFieldType<unknown>>);
        }
      }

      validateObject(item);
    },

    updateEducationAction(
      state,
      action: PayloadAction<{
        id: number;
        data: PartialFieldUpdates<EducationType>;
      }>
    ) {
      const { id, data } = action.payload;
      const index = state.formData.education.findIndex((it) => it.id === id);
      if (index === -1) return;
      const item = state.formData.education[index];

      for (const key in data) {
        const upd = data[key as keyof EducationType];
        if (!upd) continue;
        const target = (item as Record<string, unknown>)[key];
        if (isCommonField(target)) {
          Object.assign(target, upd as Partial<CommonFieldType<unknown>>);
        }
      }

      validateObject(item);
    },

    updateCertificationAction(
      state,
      action: PayloadAction<{
        id: number;
        data: PartialFieldUpdates<CertificationType>;
      }>
    ) {
      const { id, data } = action.payload;
      const index = state.formData.certifications.findIndex(
        (it) => it.id === id
      );
      if (index === -1) return;
      const item = state.formData.certifications[index];

      for (const key in data) {
        const upd = data[key as keyof CertificationType];
        if (!upd) continue;
        const target = (item as Record<string, unknown>)[key];
        if (isCommonField(target)) {
          Object.assign(target, upd as Partial<CommonFieldType<unknown>>);
        }
      }

      validateObject(item);
    },

    /* ---------- delete items ---------- */
    deleteSkillExperienceAction(state, action: PayloadAction<number>) {
      state.formData.skill_and_experience =
        state.formData.skill_and_experience.filter(
          (i) => i.id !== action.payload
        );
    },
    deleteEducationAction(state, action: PayloadAction<number>) {
      state.formData.education = state.formData.education.filter(
        (i) => i.id !== action.payload
      );
    },
    deleteCertificationAction(state, action: PayloadAction<number>) {
      state.formData.certifications = state.formData.certifications.filter(
        (i) => i.id !== action.payload
      );
    },

    /* ---------- navigation ---------- */
    nextStepAction(state) {
      // validate current step (will set errors on fields if any)
      const ok = validateStep(state.formData, state.currentStep);
      if (!ok) {
        // don't advance; errors already set by validateStep
        return;
      }
      if (state.currentStep < MAX_STEP) {
        state.currentStep += 1;
      }
    },

    prevStepAction(state) {
      if (state.currentStep > 1) state.currentStep -= 1;
    },

    /* ---------- reset & slug ---------- */
    resetFormDataAction(state) {
      state.formData = initialFormData();
      state.currentStep = 1;
    },

    updateSlugAction(state, action: PayloadAction<string>) {
      console.log("check slug:", action.payload);

      state.formData.slug = action.payload;
    },

    /* ---------- add new items helpers ---------- */
    addSkillExperienceAction(state) {
      state.formData.skill_and_experience.push(skillAndExperience());
    },

    addEducationAction(state) {
      state.formData.education.push(education());
    },

    addCertificationAction(state) {
      state.formData.certifications.push(certification());
    },

    /* ---------- Toggle Update Education and Certificate ---------- */
    updateToggleAction: (
      state,
      action: PayloadAction<"education" | "certificate">
    ) => {
      state.toggleEducationAndCertifications = action.payload;
    },
  },
});

export const {
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
  updateSlugAction,
  addSkillExperienceAction,
  addEducationAction,
  addCertificationAction,
  updateToggleAction,
  initializeFormData,
  stateUpdateAction,
} = formSlice.actions;

export default formSlice.reducer;
