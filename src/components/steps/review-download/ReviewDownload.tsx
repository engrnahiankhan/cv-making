"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Download,
  Printer as Print,
  Globe,
  Linkedin,
} from "lucide-react";

const ReviewDownload = () => {
  const data = useAppSelector((state) => state.form.data);
  const {
    address,
    city,
    contact_information,
    country,
    education_and_certifications,
    email,
    first_name,
    job_description,
    job_title,
    last_name,
    phone_number,
    skill_and_experience,
    state,
    zip_code,
  } = data;

  const educationArray = education_and_certifications?.education || [];
  const certificationArray = education_and_certifications?.certifications || [];
  const SkillAndExperienceTypeArray = skill_and_experience || [];

  const fullAddress = [address, city, state, zip_code, country]
    .filter(Boolean)
    .join(", ");

  const handleDownload = () => {
    const printContent = document.getElementById("cv-content");
    const originalContent = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
    <div className="min-h-screen bg-slate-50 py-8 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto space-y-8" id="cv-content">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 print:hidden">
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="hover:bg-slate-100">
            <Print className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button
            onClick={handleDownload}
            size="sm"
            className="bg-slate-900 hover:bg-slate-800">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Header */}
        <div className="border-b-2 border-slate-200 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            {first_name && last_name
              ? `${first_name} ${last_name}`
              : "Your Name"}
          </h1>
          {job_title && (
            <p className="text-xl text-slate-600 mt-1">{job_title}</p>
          )}
          <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-700">
            {email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              </div>
            )}
            {phone_number && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <a href={`tel:${phone_number}`} className="hover:underline">
                  {phone_number}
                </a>
              </div>
            )}
            {fullAddress && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{fullAddress}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            {job_description && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 border-b border-slate-200 pb-1 mb-3">
                  <User className="w-5 h-5 text-slate-600" />
                  Profile
                </h2>
                <p className="text-slate-700 leading-relaxed text-justify">
                  {job_description}
                </p>
              </section>
            )}

            {/* Experience */}
            {SkillAndExperienceTypeArray.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 border-b border-slate-200 pb-1 mb-5">
                  <Briefcase className="w-5 h-5 text-slate-600" />
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {SkillAndExperienceTypeArray.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-base">
                            {item.job_title || "Position Title"}
                          </h3>
                          {item.company_name && (
                            <p className="text-slate-600">
                              {item.company_name}
                            </p>
                          )}
                        </div>
                        {(item.start_date || item.end_date) && (
                          <span className="text-sm text-slate-500">
                            {formatDateRange(item.start_date, item.end_date)}
                          </span>
                        )}
                      </div>
                      {item.job_description && (
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {item.job_description}
                        </p>
                      )}
                      {item.skill?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.skill.map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-slate-100 text-slate-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8 text-sm">
            {/* Links */}
            {contact_information && (
              <section>
                <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-1 mb-3">
                  Links
                </h2>
                <div className="space-y-2">
                  {contact_information.linkedin_profile && (
                    <a
                      href={contact_information.linkedin_profile}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-600 hover:underline">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {contact_information.portfolio_website && (
                    <a
                      href={contact_information.portfolio_website}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-600 hover:underline">
                      <Globe className="w-4 h-4" />
                      Portfolio
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Education */}
            {educationArray.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 border-b border-slate-200 pb-1 mb-3">
                  <GraduationCap className="w-5 h-5 text-slate-600" />
                  Education
                </h2>
                <div className="space-y-4">
                  {educationArray.map((edu, i) => (
                    <div key={i}>
                      <p className="font-medium text-slate-900">
                        {edu.degree || "Degree"}
                      </p>
                      {edu.institution_name && (
                        <p className="text-slate-600">{edu.institution_name}</p>
                      )}
                      {(edu.start_date || edu.end_date) && (
                        <p className="text-slate-500 text-xs">
                          {formatDateRange(edu.start_date, edu.end_date)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certificationArray.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 border-b border-slate-200 pb-1 mb-3">
                  <Award className="w-5 h-5 text-slate-600" />
                  Certifications
                </h2>
                <div className="space-y-3">
                  {certificationArray.map((cert, i) => (
                    <div key={i}>
                      <p className="font-medium text-slate-900">
                        {cert.certification_title || "Certification"}
                      </p>
                      {cert.issuing_organization && (
                        <p className="text-slate-600 text-sm">
                          {cert.issuing_organization}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDownload;
