const baseUri = process.env.BASE_URI!;
export const createProfileUrl = baseUri + process.env.PROFILE_CREATE_API;
export const getProfileUrl = baseUri + process.env.NEXT_PUBLIC_PROFILE_GET_API;
export const resumeGenerateUrl = baseUri + process.env.RESUME_GENERATE_API;
