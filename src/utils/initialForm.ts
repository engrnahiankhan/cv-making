export const randomId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const personalInfo = () => {
  const data = {
    first_name: { value: "", error: "", require: true },
    last_name: { value: "", error: "", require: true },
    phone_number: { value: "", error: "", require: true },
    email: { value: "", error: "", require: true },
    country: { value: "", error: "", require: false },
    address: { value: "", error: "", require: false },
    city: { value: "", error: "", require: false },
    state: { value: "", error: "", require: false },
    zip_code: { value: "", error: "", require: false },
  };
  return data;
};

export const careerSummary = () => {
  const data = {
    job_title: { value: "", error: "", require: true },
    job_description: { value: "", error: "", require: true },
  };
  return data;
};

export const skillAndExperience = () => {
  const data = {
    id: randomId(),
    job_title: { value: "", error: "", require: true },
    start_date: { value: "", error: "", require: true },
    end_date: { value: "", error: "", require: false },
    company_name: { value: "", error: "", require: true },
    job_description: { value: "", error: "", require: false },
    achievements: { value: "", error: "", require: false },
    skill: { value: [], error: "", require: false },
  };
  return data;
};

export const education = () => {
  const data = {
    id: randomId(),
    degree: { value: "", error: "", require: true },
    institution_name: { value: "", error: "", require: true },
    major: { value: "", error: "", require: false },
    start_date: { value: "", error: "", require: true },
    end_date: { value: "", error: "", require: false },
    achievements: { value: "", error: "", require: false },
  };

  return data;
};

export const certification = () => {
  const data = {
    id: randomId(),
    certification_title: { value: "", error: "", require: false },
    issuing_organization: { value: "", error: "", require: false },
    issue_date: { value: "", error: "", require: false },
    expiration_date: { value: "", error: "", require: false },
  };
  return data;
};

export const contactInfo = () => {
  const data = {
    linkedin_profile: { value: "", error: "", require: false },
    portfolio_website: { value: "", error: "", require: false },
    other_social_media: { value: "", error: "", require: false },
    other_social_media_links: { value: "", error: "", require: false },
  };
  return data;
};

export const initialFormData = () => {
  const data = {
    id: randomId(),
    slug: "",
    personal_information: personalInfo(),
    career_summary: careerSummary(),
    skill_and_experience: [skillAndExperience()],
    education: [education()],
    certifications: [certification()],
    contact_information: contactInfo(),
  };
  return data;
};
