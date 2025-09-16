import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateField } from "@/redux/slices/formSlice";
import { Textarea } from "../ui/textarea";

const CareerSummary = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.form);

  const handleChange = (field: keyof typeof data, value: string) => {
    dispatch(updateField({ field, value }));
  };
  return (
    <div className="space-y-8">
      <div className="space-y-2 sm:space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold text-main">
          Tell Us About Yourself
        </h1>
        <p className="text-subtle text-base sm:text-lg font-normal">
          Fill in your personal details so we can tailor your resume perfectly
          to your career goals.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-1">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={data.job_title || ""}
            onChange={(e) => handleChange("job_title", e.target.value)}
            placeholder="Enter your most recent job title"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="jobDesc">Job Description</Label>

          <Textarea
            id="jobDesc"
            placeholder="Describe your role and responsibilities"
            value={data.job_description || ""}
            onChange={(e) => handleChange("job_description", e.target.value)}
            className="h-[224px] resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CareerSummary;
