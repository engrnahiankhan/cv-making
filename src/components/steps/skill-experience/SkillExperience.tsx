import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { updateSkillExperienceForm } from "@/redux/slices/formSlice";
import { SkillAndExperience } from "@/types/formTypes";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const SkillExperience = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.form);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleChange = (
    id: number,
    field: keyof SkillAndExperience,
    value: string | string[]
  ) => {
    dispatch(updateSkillExperienceForm({ id, field, value }));
  };
  return (
    <div className="space-y-8">
      <div className="space-y-2 sm:space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold text-main">
          Your Work Experience & Skills
        </h1>
        <p className="text-subtle text-base sm:text-lg font-normal">
          Highlight your work experience and skills. The more detail you
          provide, the better the AI can tailor your resume to match job
          opportunities.
        </p>
      </div>

      {data.skill_and_experience?.map((exp) => (
        <div key={exp.id} className="space-y-8">
          {/* Job title and Company Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor={`jobTitle-${exp.id}`}>Job Title</Label>
              <Input
                id={`jobTitle-${exp.id}`}
                value={exp.job_title || ""}
                onChange={(e) =>
                  handleChange(exp.id, "job_title", e.target.value)
                }
                placeholder="Enter your job title"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`companyName-${exp.id}`}>Company Name</Label>
              <Input
                id={`companyName-${exp.id}`}
                value={exp.company_name || ""}
                onChange={(e) =>
                  handleChange(exp.id, "company_name", e.target.value)
                }
                placeholder="Enter your company name"
              />
            </div>
          </div>

          {/* Job Duration */}
          <div className="space-y-1">
            <Label htmlFor={`job-duration-${exp.id}`}>Duration</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full bg-[#FCFCFD] h-[48px] sm:h-[68px] !px-4 !sm:px-6 justify-between font-normal text-base leading-[160%] font-[#333333]">
                    {startDate ? startDate.toLocaleDateString() : "Select date"}
                    <CalendarDays className="text-subtle w-6 h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setStartDate(date);
                      setOpenStartDate(false);

                      if (date) {
                        handleChange(exp.id, "start_date", date.toISOString());
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full bg-[#FCFCFD] h-[48px] sm:h-[68px] !px-4 !sm:px-6 justify-between font-normal text-base leading-[160%] font-[#333333]">
                    {endDate ? endDate.toLocaleDateString() : "Select date"}
                    <CalendarDays className="text-subtle w-6 h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setEndDate(date);
                      setOpenEndDate(false);
                      if (date) {
                        handleChange(exp.id, "end_date", date.toISOString());
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-1">
            <Label htmlFor={`jobDescription-${exp.id}`}>
              Job Description/Responsibilities
            </Label>
            <Textarea
              id={`jobDescription-${exp.id}`}
              value={exp.job_description || ""}
              onChange={(e) =>
                handleChange(exp.id, "job_description", e.target.value)
              }
              placeholder="Describe your key responsibilities and achievements"
              className="h-[200px] resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillExperience;
