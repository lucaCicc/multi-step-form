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
  onChange: (name: string, value: string) => void;
}

interface Props {
  action: (payload: FormData) => void;
  inputs: Input[];
  show: boolean;
  isLoading: boolean;
  submitLabel: string;
}
/**
 *
 *
 */
const Forms = ({ inputs, action, show, isLoading, submitLabel }: Props) => {
  if (!show) return;

  return (
    <form action={action} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        {inputs.map((input) => (
          <Input
            key={input.id}
            label={input.label}
            id={input.id}
            type={input.type}
            required={input.required}
            description={input.description}
            errorMsg={input.errorMsg}
            value={input.value}
            onChange={input.onChange}
          />
        ))}
        <SubmitButton text={submitLabel} isLoading={isLoading} />
      </div>
    </form>
  );
};

export default Forms;
