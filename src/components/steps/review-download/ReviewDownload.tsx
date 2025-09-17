import { useAppSelector } from "@/hooks/reduxHooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    id,
    job_description,
    job_title,
    last_name,
    phone_number,
    skill_and_experience,
    slug,
    state,
    zip_code,
  } = data;

  const educationArray = education_and_certifications?.education || [];
  const certificationArray = education_and_certifications?.certifications || [];
  const skillAndExperienceArray = skill_and_experience || [];

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
      new Date(date).toLocaleDateString("en-GB");

    if (!startDate && !endDate) return "";
    if (startDate && endDate)
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    if (startDate && !endDate) return `${formatDate(startDate)} - Present`;
    return formatDate(endDate);
  };

  const renderContactInfo = () => {
    if (!contact_information) return null;

    const contactItems = [];

    if (contact_information.linkedin_profile) {
      contactItems.push(
        <div key="linkedin" className="flex items-center space-x-3">
          <Linkedin className="w-4 h-4 text-slate-400" />
          <a
            href={contact_information.linkedin_profile}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-600 transition-colors text-blue-600">
            LinkedIn Profile
          </a>
        </div>
      );
    }

    if (contact_information.portfolio_website) {
      contactItems.push(
        <div key="portfolio" className="flex items-center space-x-3">
          <Globe className="w-4 h-4 text-slate-400" />
          <a
            href={contact_information.portfolio_website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-600 transition-colors text-blue-600">
            Portfolio Website
          </a>
        </div>
      );
    }

    if (contact_information.other_social_media) {
      contactItems.push(
        <div key="social" className="space-y-1">
          <p className="text-slate-700 font-medium">Other Social Media:</p>
          <div className="flex flex-col-space-y-2">
            <a
              href={contact_information.other_social_media_links}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-600 transition-colors text-blue-600">
              {contact_information.other_social_media}
            </a>
          </div>
        </div>
      );
    }

    return contactItems.length > 0 ? contactItems : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto space-y-6" id="cv-content">
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

        {/* Header Section */}
        <Card className="overflow-hidden shadow-lg print:shadow-none">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 print:bg-slate-900">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {first_name && last_name
                      ? `${first_name} ${last_name}`
                      : "Your Name"}
                  </h1>
                  {job_title && (
                    <p className="text-xl md:text-2xl text-slate-300 font-medium">
                      {job_title}
                    </p>
                  )}
                </div>
                <div className="space-y-3 text-sm md:text-base">
                  {email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <a
                        href={`mailto:${email}`}
                        className="hover:text-slate-300 transition-colors break-all">
                        {email}
                      </a>
                    </div>
                  )}
                  {phone_number && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <a
                        href={`tel:${phone_number}`}
                        className="hover:text-slate-300 transition-colors">
                        {phone_number}
                      </a>
                    </div>
                  )}
                  {fullAddress && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{fullAddress}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Summary */}
            {job_description && (
              <Card className="shadow-md print:shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <User className="w-5 h-5 text-slate-600" />
                    <span>Professional Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed text-justify">
                    {job_description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Experience Section */}
            {skillAndExperienceArray.length > 0 && (
              <Card className="shadow-md print:shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <Briefcase className="w-5 h-5 text-slate-600" />
                    <span>Professional Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillAndExperienceArray.map((item, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-1 sm:space-y-0">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-slate-900 text-lg">
                              {item.job_title || "Position Title"}
                            </h3>
                            {item.company_name && (
                              <p className="text-slate-600 font-medium">
                                {item.company_name}
                              </p>
                            )}
                          </div>
                          {(item.start_date || item.end_date) && (
                            <span className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
                              {formatDateRange(item.start_date, item.end_date)}
                            </span>
                          )}
                        </div>

                        {item.job_description && (
                          <p className="text-slate-700 leading-relaxed text-justify">
                            {item.job_description}
                          </p>
                        )}

                        {item.skill &&
                          Array.isArray(item.skill) &&
                          item.skill.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-slate-600">
                                Key Skills:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {item.skill.map((skill, skillIndex) => (
                                  <Badge
                                    key={skillIndex}
                                    variant="secondary"
                                    className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                        {index < skillAndExperienceArray.length - 1 && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            {renderContactInfo() && (
              <Card className="shadow-md print:shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800">
                    Additional Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">{renderContactInfo()}</div>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {educationArray.length > 0 && (
              <Card className="shadow-md print:shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg text-slate-800">
                    <GraduationCap className="w-5 h-5 text-slate-600" />
                    <span>Education</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {educationArray.map((edu, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-semibold text-slate-900">
                          {edu.degree || "Degree"}
                        </h3>
                        {edu.institution_name && (
                          <p className="text-slate-600 font-medium">
                            {edu.institution_name}
                          </p>
                        )}
                        {edu.major && (
                          <p className="text-sm text-slate-600">
                            Major: {edu.major}
                          </p>
                        )}
                        {(edu.start_date || edu.end_date) && (
                          <p className="text-sm text-slate-500">
                            {formatDateRange(edu.start_date, edu.end_date)}
                          </p>
                        )}
                        {index < educationArray.length - 1 && (
                          <Separator className="mt-3" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {certificationArray.length > 0 && (
              <Card className="shadow-md print:shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg text-slate-800">
                    <Award className="w-5 h-5 text-slate-600" />
                    <span>Certifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificationArray.map((cert, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-semibold text-slate-900">
                          {cert.certification_title || "Certification"}
                        </h3>
                        {cert.issuing_organization && (
                          <p className="text-slate-600 font-medium">
                            {cert.issuing_organization}
                          </p>
                        )}
                        <div className="flex flex-col space-y-1 text-sm text-slate-500">
                          {cert.issue_date && <p>Issued: {cert.issue_date}</p>}
                          {cert.expiration_date && (
                            <p>Expires: {cert.expiration_date}</p>
                          )}
                        </div>
                        {index < certificationArray.length - 1 && (
                          <Separator className="mt-3" />
                        )}
                      </div>
                    ))}
                  </div>
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
