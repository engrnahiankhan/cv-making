import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addNewCertificate,
  toggleEducationAndCertificationsAction,
  updateCertificateForm,
} from "@/redux/slices/formSlice";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays, Plus } from "lucide-react";

const Certifications = () => {
  const dispatch = useAppDispatch();
  const { data, toggleEducationAndCertifications } = useAppSelector(
    (state) => state.form
  );

  const [openStartDates, setOpenStartDates] = useState<Record<number, boolean>>(
    {}
  );
  const [openEndDates, setOpenEndDates] = useState<Record<number, boolean>>({});

  const handleChange = (
    id: number,
    field:
      | "certification_title"
      | "issuing_organization"
      | "issue_date"
      | "expiration_date",
    value: string
  ) => {
    dispatch(updateCertificateForm({ id, field, value }));
  };

  const handleToggle = (value: "education" | "certifications") => {
    dispatch(toggleEducationAndCertificationsAction(value));
  };

  // Only render if toggle is "certifications"
  if (toggleEducationAndCertifications !== "certifications") return null;

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-5xl font-semibold text-main">
              Your Certifications
            </h1>
            <button
              onClick={() => handleToggle("education")}
              className="bg-main py-2 px-5 gap-3 text-white font-medium text-base rounded-[6px] flex items-center hover:bg-black cursor-pointer transition-colors">
              Education
            </button>
          </div>

          <p className="text-subtle text-base sm:text-lg font-normal">
            Provide your academic qualifications and any relevant certifications
            to strengthen your resume.
          </p>
        </div>

        {data.education_and_certifications?.certifications?.map((exp) => (
          <div key={exp.id} className="space-y-8">
            {/* Certification Title */}
            <div className="space-y-1">
              <Label htmlFor={`certification-title-${exp.id}`}>
                Certification Title
              </Label>
              <Input
                id={`certification-title-${exp.id}`}
                value={exp.certification_title || ""}
                onChange={(e) =>
                  handleChange(exp.id, "certification_title", e.target.value)
                }
                placeholder="Enter your degree"
              />
            </div>

            {/* Issuing Organization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor={`issuingOrganization-${exp.id}`}>
                  Issuing Organization
                </Label>
                <Input
                  id={`issuingOrganization-${exp.id}`}
                  value={exp.issuing_organization || ""}
                  onChange={(e) =>
                    handleChange(exp.id, "issuing_organization", e.target.value)
                  }
                  placeholder="Enter your organization name"
                />
              </div>
            </div>

            {/* Certificate Issue */}
            <div className="space-y-1">
              <Label htmlFor={`certificate-issue-${exp.id}`}>
                Certificate Issue
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Popover
                  open={!!openStartDates[exp.id]}
                  onOpenChange={(open) =>
                    setOpenStartDates((prev) => ({ ...prev, [exp.id]: open }))
                  }>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full bg-[#FCFCFD] h-[48px] sm:h-[68px] !px-4 !sm:px-6 justify-between font-normal text-base leading-[160%] font-[#333333]">
                      {exp.issue_date
                        ? new Date(exp.issue_date).toLocaleDateString()
                        : "Issue date"}
                      <CalendarDays className="text-subtle w-6 h-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start">
                    <Calendar
                      mode="single"
                      selected={
                        exp.issue_date ? new Date(exp.issue_date) : undefined
                      }
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setOpenStartDates((prev) => ({
                          ...prev,
                          [exp.id]: false,
                        }));
                        if (date)
                          handleChange(
                            exp.id,
                            "issue_date",
                            date.toISOString()
                          );
                      }}
                    />
                  </PopoverContent>
                </Popover>

                <Popover
                  open={!!openEndDates[exp.id]}
                  onOpenChange={(open) =>
                    setOpenEndDates((prev) => ({ ...prev, [exp.id]: open }))
                  }>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full bg-[#FCFCFD] h-[48px] sm:h-[68px] !px-4 !sm:px-6 justify-between font-normal text-base leading-[160%] font-[#333333]">
                      {exp.expiration_date
                        ? new Date(exp.expiration_date).toLocaleDateString()
                        : "Expiry Date (if applicable)"}
                      <CalendarDays className="text-subtle w-6 h-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start">
                    <Calendar
                      mode="single"
                      selected={
                        exp.expiration_date
                          ? new Date(exp.expiration_date)
                          : undefined
                      }
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setOpenEndDates((prev) => ({
                          ...prev,
                          [exp.id]: false,
                        }));
                        if (date)
                          handleChange(
                            exp.id,
                            "expiration_date",
                            date.toISOString()
                          );
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="border-b-[2px] border-[#E0E0E0] w-full" />
          </div>
        ))}
      </div>

      <button
        className="font-medium text-xl text-prime hover:text-green-600 transition-colors flex items-center gap-3 cursor-pointer duration-200 pt-6"
        onClick={() => dispatch(addNewCertificate())}>
        <Plus className="w-6 h-6" />
        Add Another Certification
      </button>
    </>
  );
};

export default Certifications;
