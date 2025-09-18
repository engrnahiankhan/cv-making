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
import { useFormActions } from "@/hooks/useFormAction";
import StarMark from "../shared/StarMark";
import InputError from "../shared/InputError";

const PersonalInfo = () => {
  const { formState, updatePersonalInfo } = useFormActions();
  const data = formState.formData.personal_information;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-semibold text-main">
          Tell Us About Yourself
        </h1>
        <p className="text-subtle text-base sm:text-lg font-normal">
          Fill in your personal details so we can tailor your resume perfectly
          to your career goals.
        </p>
      </div>

      <div className="space-y-8">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <Label htmlFor="firstName">
              First Name <StarMark />
            </Label>
            <Input
              id="firstName"
              value={data.first_name.value || ""}
              onChange={(e) => updatePersonalInfo("first_name", e.target.value)}
              placeholder="John"
            />
            {data.first_name.error && (
              <InputError text={data.first_name.error} />
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">
              Last Name <StarMark />
            </Label>
            <Input
              id="lastName"
              value={data.last_name.value || ""}
              onChange={(e) => updatePersonalInfo("last_name", e.target.value)}
              placeholder="Doe"
            />
            {data.last_name.error && <InputError text={data.last_name.error} />}
          </div>
        </div>

        {/* Phone Number and Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <Label htmlFor="phone">
              Phone Number <StarMark />
            </Label>
            <Input
              id="phone"
              value={data.phone_number.value || ""}
              onChange={(e) =>
                updatePersonalInfo("phone_number", e.target.value)
              }
              placeholder="+0997808747"
            />
            {data.phone_number.error && (
              <InputError text={data.phone_number.error} />
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">
              Email Address <StarMark />
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email.value || ""}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              placeholder="johndoe@gmail.com"
            />
            {data.email.error && <InputError text={data.email.error} />}
          </div>
        </div>

        {/* Country/Region and Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1 md:col-span-1">
            <Label htmlFor="country">Country/Region</Label>
            <Select
              value={data.country.value || ""}
              onValueChange={(value) => updatePersonalInfo("country", value)}>
              <SelectTrigger className="border-gray-300 focus:border-gray-400 focus:ring-0 w-full">
                <SelectValue placeholder="Bangladesh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Pakistan">Pakistan</SelectItem>
                <SelectItem value="USA">United States</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={data.address.value || ""}
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              placeholder="Section-06, Mirpur, Dhaka."
            />
          </div>
        </div>

        {/* City, State, ZIP Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={data.city.value || ""}
              onChange={(e) => updatePersonalInfo("city", e.target.value)}
              placeholder="Dhaka"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={data.state.value || ""}
              onChange={(e) => updatePersonalInfo("state", e.target.value)}
              placeholder="Dhaka"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={data.zip_code.value || ""}
              onChange={(e) => updatePersonalInfo("zip_code", e.target.value)}
              placeholder="1216"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
