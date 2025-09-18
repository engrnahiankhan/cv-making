import { CircleAlert } from "lucide-react";

interface InputErrorPropsType {
  text: string;
}

const InputError = ({ text }: InputErrorPropsType) => {
  return (
    <p
      className="text-destructive text-sm sm:text-base flex items-center
          
          ">
      <CircleAlert className="h-4 w-4 mr-1" /> <span className="">{text}</span>
    </p>
  );
};

export default InputError;
