"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Calendar,
  Award,
} from "lucide-react";
import { useFormActions } from "@/hooks/useFormAction";

const ReviewDownload = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const { formState } = useFormActions();

  // const handlePrint = () => {
  //   window.print();
  // };

  const personalInfo = formState.formData.personal_information;
  const contactInfo = formState.formData.contact_information;
  const educationList = formState.formData.education;
  const certificationList = formState.formData.certifications;
  const skillAndExperienceList = formState.formData.skill_and_experience;
  const careerSummary = formState.formData.career_summary;

  const formatDateRange = (startDate?: string, endDate?: string): string => {
    const formatDate = (date: string): string =>
      new Date(date).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      });

    if (!startDate && !endDate) return "";
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    if (startDate && !endDate) {
      return `${formatDate(startDate)} - Present`;
    }
    return formatDate(endDate!); // endDate is guaranteed here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Print/Download Buttons */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-end gap-3 px-4">
        <Button
          variant="outline"
          className="shadow-sm hover:shadow-md transition-shadow">
          <Printer className="mr-2 w-4 h-4" /> Print CV
        </Button>
        <Button className="shadow-sm hover:shadow-md transition-shadow bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 w-4 h-4" /> Download PDF
        </Button>
      </div>

      {/* CV Content */}
      <div
        ref={printRef}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo.first_name.value} {personalInfo.last_name.value}
            </h1>
            {careerSummary.job_title.value && (
              <p className="text-xl text-blue-100 font-medium">
                {careerSummary.job_title.value}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar */}
          <div className="lg:w-1/3 bg-gray-50 px-6 py-8 space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                Contact Information
              </h3>
              <div className="space-y-3 text-sm">
                {personalInfo.email.value && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      {personalInfo.email.value}
                    </span>
                  </div>
                )}
                {personalInfo.phone_number.value && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      {personalInfo.phone_number.value}
                    </span>
                  </div>
                )}
                {(personalInfo.address.value ||
                  personalInfo.city.value ||
                  personalInfo.country.value) && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      {[
                        personalInfo.address.value,
                        personalInfo.city.value,
                        personalInfo.country.value,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
                {contactInfo.linkedin_profile.value && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 break-all">
                      {contactInfo.linkedin_profile.value}
                    </span>
                  </div>
                )}
                {contactInfo.portfolio_website.value && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 break-all">
                      {contactInfo.portfolio_website.value}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skillAndExperienceList.some(
              (exp) => exp.skill.value.length > 0
            ) && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(
                      skillAndExperienceList.flatMap((exp) => exp.skill.value)
                    )
                  ).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certificationList.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Certifications
                </h3>
                <div className="space-y-4">
                  {certificationList.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {cert.certification_title.value}
                          </p>
                          <p className="text-gray-600 text-xs">
                            {cert.issuing_organization.value}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {cert.issue_date.value}
                            {cert.expiration_date.value &&
                              ` - ${cert.expiration_date.value}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 px-8 py-8 space-y-8">
            {/* Career Summary */}
            {careerSummary.job_description.value && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Professional Summary
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {careerSummary.job_description.value}
                </p>
              </div>
            )}

            {/* Professional Experience */}
            {skillAndExperienceList.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-600">
                  Professional Experience
                </h3>
                <div className="space-y-6">
                  {skillAndExperienceList.map((exp) => (
                    <div
                      key={exp.id}
                      className="border-l-4 border-blue-600 pl-6 pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-gray-800">
                          {exp.job_title.value}
                        </h4>
                        <span className="text-gray-500">@</span>
                        <span className="text-lg font-semibold text-blue-600">
                          {exp.company_name.value}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500 font-medium">
                          {formatDateRange(
                            exp.start_date.value,
                            exp.end_date.value
                          )}
                        </span>
                      </div>

                      {exp.job_description.value && (
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {exp.job_description.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {educationList.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-600">
                  Education
                </h3>
                <div className="space-y-4">
                  {educationList.map((edu) => (
                    <div
                      key={edu.id}
                      className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-bold text-gray-800">
                        {edu.degree.value} in {edu.major.value}
                      </h4>
                      <p className="text-blue-600 font-semibold mt-1">
                        {edu.institution_name.value}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {formatDateRange(
                            edu.start_date.value,
                            edu.end_date.value
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDownload;
