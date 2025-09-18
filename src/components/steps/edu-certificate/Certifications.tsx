import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays, Plus } from "lucide-react";
import { useFormActions } from "@/hooks/useFormAction";
import StarMark from "@/components/shared/StarMark";
import InputError from "@/components/shared/InputError";

const Certifications = () => {
  const { formState, updateCertification, addCertification, updateToggle } =
    useFormActions();
  const data = formState.formData.certifications;

  const [openStartDates, setOpenStartDates] = useState<Record<number, boolean>>(
    {}
  );
  const [openEndDates, setOpenEndDates] = useState<Record<number, boolean>>({});

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-5xl font-semibold text-main">
              Your Certifications
            </h1>
            <button
              onClick={() => updateToggle("education")}
              className="bg-main py-2 px-5 gap-3 text-white font-medium text-base rounded-[6px] flex items-center hover:bg-black cursor-pointer transition-colors">
              Education
            </button>
          </div>

          <p className="text-subtle text-base sm:text-lg font-normal">
            Provide your academic qualifications and any relevant certifications
            to strengthen your resume.
          </p>
        </div>

        {data.map((exp) => (
          <div key={exp.id} className="space-y-8">
            {/* Certification Title */}
            <div className="space-y-1">
              <Label htmlFor={`certification-title-${exp.id}`}>
                Certification Title <StarMark />
              </Label>
              <Input
                id={`certification-title-${exp.id}`}
                value={exp.certification_title.value || ""}
                onChange={(e) =>
                  updateCertification(exp.id, {
                    certification_title: {
                      ...exp.certification_title,
                      value: e.target.value,
                    },
                  })
                }
                placeholder="Enter your degree"
              />
              {exp.certification_title.error && (
                <InputError text={exp.certification_title.error} />
              )}
            </div>

            {/* Issuing Organization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor={`issuingOrganization-${exp.id}`}>
                  Issuing Organization <StarMark />
                </Label>
                <Input
                  id={`issuingOrganization-${exp.id}`}
                  value={exp.issuing_organization.value || ""}
                  onChange={(e) =>
                    updateCertification(exp.id, {
                      issuing_organization: {
                        ...exp.issuing_organization,
                        value: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter your organization name"
                />
                {exp.issuing_organization.error && (
                  <InputError text={exp.issuing_organization.error} />
                )}
              </div>
            </div>

            {/* Certificate Issue */}
            <div className="space-y-1">
              <Label htmlFor={`certificate-issue-${exp.id}`}>
                Certificate Issue <StarMark />
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
                      {exp.issue_date.value
                        ? new Date(exp.issue_date.value).toLocaleDateString()
                        : "Issue date"}
                      <CalendarDays className="text-subtle w-6 h-6" />
                    </Button>
                  </PopoverTrigger>
                  {exp.issue_date.error && (
                    <InputError text={exp.issue_date.error} />
                  )}
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start">
                    <Calendar
                      mode="single"
                      selected={
                        exp.issue_date.value
                          ? new Date(exp.issue_date.value)
                          : undefined
                      }
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setOpenStartDates((prev) => ({
                          ...prev,
                          [exp.id]: false,
                        }));
                        if (date)
                          updateCertification(exp.id, {
                            issue_date: {
                              ...exp.issue_date,
                              value: date.toISOString(),
                            },
                          });
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
                      {exp.expiration_date.value
                        ? new Date(
                            exp.expiration_date.value
                          ).toLocaleDateString()
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
                        exp.expiration_date.value
                          ? new Date(exp.expiration_date.value)
                          : undefined
                      }
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setOpenEndDates((prev) => ({
                          ...prev,
                          [exp.id]: false,
                        }));
                        if (date)
                          updateCertification(exp.id, {
                            expiration_date: {
                              ...exp.expiration_date,
                              value: date.toISOString(),
                            },
                          });
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
        onClick={() => addCertification()}>
        <Plus className="w-6 h-6" />
        Add Another Certification
      </button>
    </>
  );
};

export default Certifications;
