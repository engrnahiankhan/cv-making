import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Label } from "../ui/label";
import { updateField } from "@/redux/slices/formSlice";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const jobTitles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Marketing Specialist",
  "Sales Manager",
  "Human Resources Manager",
  "Financial Analyst",
  "Operations Manager",
  "Customer Support Specialist",
  "Business Analyst",
  "Project Coordinator",
  "Content Strategist",
  "Digital Marketing Manager",
  "Quality Assurance Engineer",
  "DevOps Engineer",
  "Full Stack Developer",
  "Mobile App Developer",
  "Graphic Designer",
  "IT Support Specialist",
  "Network Administrator",
];

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
          Your Career Overview
        </h1>
        <p className="text-subtle text-base sm:text-lg font-normal">
          A strong career summary will make a lasting impression on recruiters.
          Let’s create a summary that highlights your experience and goals.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-1">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Select
            value={data.job_title || ""}
            onValueChange={(value) => handleChange("job_title", value)}>
            <SelectTrigger className="!h-[64px] border-gray-300 focus:border-gray-400 focus:ring-0 w-full">
              <SelectValue placeholder="Enter your most recent job" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-60">
                {jobTitles.map((title) => (
                  <SelectItem className="w-[98%]" key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </SelectContent>
          </Select>
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
