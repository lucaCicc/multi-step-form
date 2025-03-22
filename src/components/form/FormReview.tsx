import { SubmitButton } from "@/components/buttons/SubmitButton";
import { Input } from "@/components/inputs/DefaultInput";
import { InitFormDataType } from "@/types";

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
  action: () => void;
  inputs?: InitFormDataType;
  show: boolean;
  isLoading: boolean;
  submitLabel: string;
}
/**
 *
 *
 */
const FormReview = ({
  inputs = {},
  action,
  show,
  isLoading,
  submitLabel,
}: Props) => {
  if (!show) return;

  return (
    <div className="flex flex-1 flex-col gap-2 items-stretch lg:max-w-[700px]">
      {Object.entries(inputs).map(([key, value]) => (
        <Input
          id={key}
          key={key}
          label={key}
          type={"text"}
          value={value}
          disabled={true}
          required={false}
          description={""}
        />
      ))}

      <SubmitButton text={submitLabel} isLoading={isLoading} onPress={action} />
    </div>
  );
};

export default FormReview;
