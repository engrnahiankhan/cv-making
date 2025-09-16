"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { updateContactInformation } from "@/redux/slices/formSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

const otherSocialMedias = ["Facebook", "Twitter", "Instagram", "GitHub"];

const ContactInfo = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.form);

  const handleChange = (
    field: keyof NonNullable<typeof data.contact_information>,
    value: string
  ) => {
    dispatch(updateContactInformation({ field, value }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 sm:space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold text-main">
          Your Contact Information
        </h1>
        <p className="text-subtle text-base sm:text-lg font-normal">
          Include additional contact details and social media links to showcase
          your professional presence.
        </p>
      </div>

      <div className="space-y-8">
        {/* Linkedin profile */}
        <div className="space-y-1">
          <Label htmlFor="linkedin-profile">LinkedIn Profile</Label>
          <Input
            id="linkedin-profile"
            value={data.contact_information?.linkedin_profile || ""}
            onChange={(e) => handleChange("linkedin_profile", e.target.value)}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        {/* Personal Website/Portfolio */}
        <div className="space-y-1">
          <Label htmlFor="PersonalPortfolio">Personal Website/Portfolio</Label>
          <Input
            id="PersonalPortfolio"
            value={data.contact_information?.portfolio_website || ""}
            onChange={(e) => handleChange("portfolio_website", e.target.value)}
            placeholder="https://myportfolio.com"
          />
        </div>

        {/* Other social media and social URL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1 md:col-span-1">
            <Label htmlFor="OtherSocialMedia">Other Social Media</Label>
            <Select
              value={data.contact_information?.other_social_media || ""}
              onValueChange={(value) =>
                handleChange("other_social_media", value)
              }>
              <SelectTrigger className="!h-[64px] border-gray-300 focus:border-gray-400 focus:ring-0 w-full">
                <SelectValue placeholder="Select a social media" />
              </SelectTrigger>
              <SelectContent>
                {otherSocialMedias.map((media) => (
                  <SelectItem key={media} value={media}>
                    {media}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <Label htmlFor="OtherSocialMediaLink">
              Other Social Media Link
            </Label>
            <Input
              id="OtherSocialMediaLink"
              value={data.contact_information?.other_social_media_links || ""}
              onChange={(e) =>
                handleChange("other_social_media_links", e.target.value)
              }
              placeholder="https://facebook.com/username"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
