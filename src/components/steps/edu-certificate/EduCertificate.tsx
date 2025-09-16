import { useAppSelector } from "@/hooks/reduxHooks";
import Certifications from "./Certifications";
import Education from "./Education";

const EduCertificate = () => {
  const currentToggle = useAppSelector(
    (state) => state.form.toggleEducationAndCertifications
  );
  return (
    <>{currentToggle === "education" ? <Education /> : <Certifications />}</>
  );
};

export default EduCertificate;
