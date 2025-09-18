// ================= COMMON FIELD =================
export interface CommonFieldType<T = string> {
  value: T;
  error: string;
  require: boolean;
}

// ================= PERSONAL INFO =================
export interface PersonalInfoType {
  first_name: CommonFieldType;
  last_name: CommonFieldType;
  phone_number: CommonFieldType;
  email: CommonFieldType;
  country: CommonFieldType;
  address: CommonFieldType;
  city: CommonFieldType;
  state: CommonFieldType;
  zip_code: CommonFieldType;
}

// ================= CAREER SUMMARY =================
export interface CareerSummaryType {
  job_title: CommonFieldType;
  job_description: CommonFieldType;
}

// ================= SKILLS & EXPERIENCE =================
export interface SkillAndExperienceType {
  id: number;
  job_title: CommonFieldType;
  company_name: CommonFieldType;
  start_date: CommonFieldType;
  end_date: CommonFieldType;
  job_description: CommonFieldType;
  achievements: CommonFieldType;
  skill: CommonFieldType<string[]>;
}

// ================= EDUCATION =================
export interface EducationType {
  id: number;
  degree: CommonFieldType;
  institution_name: CommonFieldType;
  major: CommonFieldType;
  start_date: CommonFieldType;
  end_date: CommonFieldType;
  achievements: CommonFieldType;
}

// ================= CERTIFICATION =================
export interface CertificationType {
  id: number;
  certification_title: CommonFieldType;
  issuing_organization: CommonFieldType;
  issue_date: CommonFieldType;
  expiration_date: CommonFieldType;
}

// ================= CONTACT INFO =================
export interface ContactInformationType {
  linkedin_profile: CommonFieldType;
  portfolio_website: CommonFieldType;
  other_social_media: CommonFieldType;
  other_social_media_links: CommonFieldType;
}

// ================= FULL FORM =================
export interface FormStructureType {
  id: number;
  slug: string;
  personal_information: PersonalInfoType;
  career_summary: CareerSummaryType;
  skill_and_experience: SkillAndExperienceType[];
  education: EducationType[];
  certifications: CertificationType[];
  contact_information: ContactInformationType;
}
