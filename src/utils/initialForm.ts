export const randomId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const initialFormData = () => {
  const data = {
    id: randomId(),
    slug: "",
    personal_information: {
      first_name: { value: "", error: "", require: false },
      last_name: { value: "", error: "", require: false },
      phone_number: { value: "", error: "", require: false },
      email: { value: "", error: "", require: false },
      country: { value: "", error: "", require: false },
      address: { value: "", error: "", require: false },
      city: { value: "", error: "", require: false },
      state: { value: "", error: "", require: false },
      zip_code: { value: "", error: "", require: false },
    },
    career_summary: {
      job_title: { value: "", error: "", require: false },
      job_description: { value: "", error: "", require: false },
    },
    skill_and_experience: [
      {
        id: randomId(),
        job_title: { value: "", error: "", require: false },
        start_date: { value: "", error: "", require: false },
        end_date: { value: "", error: "", require: false },
        company_name: { value: "", error: "", require: false },
        job_description: { value: "", error: "", require: false },
        achievements: { value: "", error: "", require: false },
        skill: { value: [], error: "", require: false },
      },
    ],
    education: [
      {
        id: randomId(),
        degree: { value: "", error: "", require: false },
        institution_name: { value: "", error: "", require: false },
        major: { value: "", error: "", require: false },
        start_date: { value: "", error: "", require: false },
        end_date: { value: "", error: "", require: false },
        achievements: { value: "", error: "", require: false },
      },
    ],
    certifications: [
      {
        id: randomId(),
        certification_title: { value: "", error: "", require: false },
        issuing_organization: { value: "", error: "", require: false },
        issue_date: { value: "", error: "", require: false },
        expiration_date: { value: "", error: "", require: false },
      },
    ],
    contact_information: {
      linkedin_profile: { value: "", error: "", require: false },
      portfolio_website: { value: "", error: "", require: false },
      other_social_media: { value: "", error: "", require: false },
      other_social_media_links: { value: "", error: "", require: false },
    },
  };

  return data;
};
