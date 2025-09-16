interface SkillAndExperience {
  id: number;
  job_title: string;
  start_date: string;
  end_date: string;
  city: string;
  job_description: string;
  achievements: string;
  skill: string[];
}

interface Education {
  id: number;
  degree: string;
  institution_name: string;
  major: string;
  start_date: string;
  end_date: string;
  achievements: string;
}

interface Certification {
  id: number;
  certification_title: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date: string;
}

interface EducationAndCertifications {
  education: Education[];
  certifications: Certification[];
}

interface ContactInformation {
  linkedin_profile: string;
  portfolio_website: string;
  other_social_media: string[];
  other_social_media_links: string;
}

interface FormStructure {
  id: number;
  slug: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  job_title: string;
  job_description: string;
  skill_and_experience: SkillAndExperience[];
  education_and_certifications: EducationAndCertifications;
  contact_information: ContactInformation;
}
export type {
  FormStructure,
  SkillAndExperience,
  EducationAndCertifications,
  ContactInformation,
};
