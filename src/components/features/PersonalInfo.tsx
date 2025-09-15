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
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { nextStep, updateField } from "@/redux/slices/formSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.form);

  const handleChange = (field: keyof typeof data, value: string) => {
    dispatch(updateField({ field, value }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">
          Tell Us About Yourself
        </h1>
        <p className="text-gray-600 text-lg">
          Fill in your personal details so we can tailor your resume perfectly
          to your career goals.
        </p>
      </div>

      <div className="space-y-6">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-900">
              First Name
            </Label>
            <Input
              id="firstName"
              value={data.first_name || ""}
              onChange={(e) => handleChange("first_name", e.target.value)}
              placeholder="Saifur"
              className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-900">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={data.last_name || ""}
              onChange={(e) => handleChange("last_name", e.target.value)}
              placeholder="Rahman"
              className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
            />
          </div>
        </div>

        {/* Phone Number and Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-900">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={data.phone_number || ""}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              placeholder="+880 1567808747"
              className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-900">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="ux.saifur.info@gmail.com"
              className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
            />
          </div>
        </div>

        {/* Country/Region and Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="country"
              className="text-sm font-medium text-gray-900">
              Country/Region
            </Label>
            <Select
              value={data.country || ""}
              onValueChange={(value) => handleChange("country", value)}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0">
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
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-900">
              Address
            </Label>
            <Input
              id="address"
              value={data.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Section-06, Mirpur, Dhaka."
              className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
            />
          </div>
        </div>

        {/* City, State, ZIP Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-900">
              City
            </Label>
            <Input
              id="city"
              value={data.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Dhaka"
              className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="state"
              className="text-sm font-medium text-gray-900">
              State
            </Label>
            <Input
              id="state"
              value={data.state || ""}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="Dhaka"
              className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="zipCode"
              className="text-sm font-medium text-gray-900">
              ZIP Code
            </Label>
            <Input
              id="zipCode"
              value={data.zip_code || ""}
              onChange={(e) => handleChange("zip_code", e.target.value)}
              placeholder="1216"
              className="h-12 border-gray-300 focus:border-gray-400 focus:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
