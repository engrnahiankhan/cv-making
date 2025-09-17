import { useFormActions } from "@/hooks/useFormAction";
import Certifications from "./Certifications";
import Education from "./Education";

const EduCertificate = () => {
  const { formState } = useFormActions();
  const toggle = formState.toggleEducationAndCertifications;
  return <>{toggle === "education" ? <Education /> : <Certifications />}</>;
};

export default EduCertificate;
