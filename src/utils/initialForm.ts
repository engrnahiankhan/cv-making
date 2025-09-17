const randomId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const initialFormData = () => {
  const data = {
    id: randomId(),
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
        id: randomId(),
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
          id: randomId(),
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
          id: randomId(),
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
      other_social_media: "",
      other_social_media_links: "",
    },
  };

  return data;
};
