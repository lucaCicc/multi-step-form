import { SubmitButton } from "@/components/buttons/SubmitButton";
import { Input } from "@/components/inputs/DefaultInput";

interface Input {
  id: string;
  label: string;
  type: string;
  required: boolean;
  description: string;
  errorMsg: string | undefined;
  value: string | undefined;
}

interface Props {
  action: (payload: FormData) => void;
  onChange: (name: string, value: string) => void;
  inputs: Input[];
  show: boolean;
  isLoading: boolean;
  submitLabel: string;
}
/**
 *
 *
 */
const Forms = ({
  inputs,
  action,
  show,
  isLoading,
  submitLabel,
  onChange,
}: Props) => {
  if (!show) return;

  return (
    <form action={action} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        {inputs.map((input) => (
          <Input
            id={input.id}
            key={input.id}
            type={input.type}
            value={input.value}
            label={input.label}
            required={input.required}
            onChange={onChange}
            errorMsg={input.errorMsg}
            description={input.description}
          />
        ))}
        <SubmitButton text={submitLabel} isLoading={isLoading} />
      </div>
    </form>
  );
};

export default Forms;
