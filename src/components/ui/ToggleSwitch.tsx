import { Field, Label, Switch } from '@headlessui/react';

type ToggleSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

const ToggleSwitch = ({ label, checked, onChange }: ToggleSwitchProps) => {
  return (
    <Field className="flex items-center justify-between gap-2">
      <Label className="select-none body1">{label}</Label>
      <Switch
        checked={checked}
        onChange={onChange}
        className="group inline-flex h-[18px] w-[34px] items-center rounded-full bg-gray-200 transition data-[checked]:bg-green"
      >
        <span className="size-[14px] translate-x-[2px] rounded-full bg-gray-300 transition group-data-[checked]:translate-x-[18px] group-data-[checked]:bg-white" />
      </Switch>
    </Field>
  );
};

export default ToggleSwitch;
