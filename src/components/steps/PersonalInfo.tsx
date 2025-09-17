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
import { updateField } from "@/redux/slices/formSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.form);

  const handleChange = (field: keyof typeof data, value: string) => {
    dispatch(updateField({ field, value }));
  };

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
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={data.first_name || ""}
              onChange={(e) => handleChange("first_name", e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={data.last_name || ""}
              onChange={(e) => handleChange("last_name", e.target.value)}
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Phone Number and Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={data.phone_number || ""}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              placeholder="+0997808747"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>

        {/* Country/Region and Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1 md:col-span-1">
            <Label htmlFor="country">Country/Region</Label>
            <Select
              value={data.country || ""}
              onValueChange={(value) => handleChange("country", value)}>
              <SelectTrigger className="!h-[64px] border-gray-300 focus:border-gray-400 focus:ring-0 w-full">
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
              value={data.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
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
              value={data.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Dhaka"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={data.state || ""}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="Dhaka"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={data.zip_code || ""}
              onChange={(e) => handleChange("zip_code", e.target.value)}
              placeholder="1216"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
