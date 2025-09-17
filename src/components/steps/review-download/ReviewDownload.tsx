"use client";

import { useRef } from "react";
import { useFormActions } from "@/hooks/useFormAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";

const ReviewDownload = () => {
  const { formState } = useFormActions();
  const printRef = useRef<HTMLDivElement>(null);

  // Print / Download handler
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${formState.formData.personal_information.first_name.value}_CV`,
  });

  const personalInfo = formState.formData.personal_information;
  const contactInfo = formState.formData.contact_information;
  const educationList = formState.formData.education;
  const certificationList = formState.formData.certifications;
  const skillAndExperienceList = formState.formData.skill_and_experience;
  const careerSummary = formState.formData.career_summary;

  const formatDateRange = (startDate: string, endDate: string) => {
    const formatDate = (date: string) =>
      new Date(date).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      });

    if (!startDate && !endDate) return "";
    if (startDate && endDate)
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    if (startDate && !endDate) return `${formatDate(startDate)} - Present`;
    return formatDate(endDate);
  };

  return (
    <div className="space-y-4">
      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <Button onClick={handlePrint} variant="outline" size="sm">
          <Printer className="mr-2 w-4 h-4" /> Print
        </Button>
        <Button onClick={handlePrint} variant="outline" size="sm">
          <Download className="mr-2 w-4 h-4" /> Download
        </Button>
      </div>

      {/* CV Content */}
      <div
        ref={printRef}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg text-gray-900 dark:text-white">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            {personalInfo.first_name.value} {personalInfo.last_name.value}
          </h1>
          {careerSummary.job_title.value && (
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
              {careerSummary.job_title.value}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <div className="lg:w-1/3 space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                {personalInfo.email.value && (
                  <p>Email: {personalInfo.email.value}</p>
                )}
                {personalInfo.phone_number.value && (
                  <p>Phone: {personalInfo.phone_number.value}</p>
                )}
                {(personalInfo.address.value ||
                  personalInfo.city.value ||
                  personalInfo.country.value) && (
                  <p>
                    Address: {personalInfo.address.value},{" "}
                    {personalInfo.city.value}, {personalInfo.country.value}
                  </p>
                )}
                {contactInfo.linkedin_profile.value && (
                  <p>LinkedIn: {contactInfo.linkedin_profile.value}</p>
                )}
                {contactInfo.portfolio_website.value && (
                  <p>Portfolio: {contactInfo.portfolio_website.value}</p>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            {skillAndExperienceList.some(
              (exp) => exp.skill.value.length > 0
            ) && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  {Array.from(
                    new Set(
                      skillAndExperienceList.flatMap((exp) => exp.skill.value)
                    )
                  ).join(", ")}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel */}
          <div className="lg:w-2/3 space-y-6">
            {/* Career Summary */}
            {careerSummary.job_description.value && (
              <Card>
                <CardHeader>
                  <CardTitle>Career Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700 dark:text-gray-300">
                  {careerSummary.job_description.value}
                </CardContent>
              </Card>
            )}

            {/* Experience */}
            {skillAndExperienceList.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {skillAndExperienceList.map((exp) => (
                    <div key={exp.id}>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {exp.job_title.value} @ {exp.company_name.value}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {formatDateRange(
                          exp.start_date.value,
                          exp.end_date.value
                        )}
                      </p>
                      {exp.job_description.value && (
                        <p>{exp.job_description.value}</p>
                      )}
                      {exp.achievements.value && (
                        <p className="text-gray-600">
                          Achievements: {exp.achievements.value}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {educationList.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {educationList.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-semibold">
                        {edu.degree.value} in {edu.major.value}
                      </p>
                      <p>{edu.institution_name.value}</p>
                      <p className="text-gray-500">
                        {formatDateRange(
                          edu.start_date.value,
                          edu.end_date.value
                        )}
                      </p>
                      {edu.achievements.value && (
                        <p>Achievements: {edu.achievements.value}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {certificationList.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {certificationList.map((cert) => (
                    <div key={cert.id}>
                      <p className="font-medium">
                        {cert.certification_title.value}
                      </p>
                      <p>{cert.issuing_organization.value}</p>
                      <p className="text-gray-500">
                        Issued: {cert.issue_date.value}{" "}
                        {cert.expiration_date.value &&
                          `- Expires: ${cert.expiration_date.value}`}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDownload;
