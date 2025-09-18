interface InputErrorPropsType {
  text: string;
}

const InputError = ({ text }: InputErrorPropsType) => {
  return (
    <span
      className="text-destructive text-sm sm:text-base flex items-center
          space-x-2
          ">
      {text}
    </span>
  );
};

export default InputError;
