export interface CommonFieldType {
  value: string;
  error: string;
  require: boolean;
}

export interface SkillAndExperienceType {
  id: number;
  job_title: CommonFieldType;
  company_name: CommonFieldType;
  start_date: CommonFieldType;
  end_date: CommonFieldType;
  job_description: CommonFieldType;
  achievements: CommonFieldType;
  skill: CommonFieldType[];
}

export interface Education {
  id: number;
  degree: CommonFieldType;
  institution_name: CommonFieldType;
  major: CommonFieldType;
  start_date: CommonFieldType;
  end_date: CommonFieldType;
  achievements: CommonFieldType;
}

export interface Certification {
  id: number;
  certification_title: CommonFieldType;
  issuing_organization: CommonFieldType;
  issue_date: CommonFieldType;
  expiration_date: CommonFieldType;
}

export interface ContactInformation {
  linkedin_profile: CommonFieldType;
  portfolio_website: CommonFieldType;
  other_social_media: CommonFieldType;
  other_social_media_links: CommonFieldType;
}

export interface PersonalInfoType {
  first_name: ContactInformation;
  last_name: ContactInformation;
  phone_number: ContactInformation;
  email: ContactInformation;
  country: ContactInformation;
  address: ContactInformation;
  city: ContactInformation;
  state: ContactInformation;
  zip_code: ContactInformation;
}

export interface CareerSummary {
  job_title: ContactInformation;
  job_description: ContactInformation;
}
export interface FormStructure {
  id: number;
  slug: string;
  personal_information: PersonalInfoType;
  career_summary: CareerSummary;
  skill_and_experience: SkillAndExperienceType[];
  education: Education[];
  certifications: Certification[];
  contact_information: ContactInformation;
}
