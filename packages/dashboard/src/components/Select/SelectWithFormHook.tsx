import { Control, Controller } from 'react-hook-form';

import Select, { SelectProps } from './Select';

export type SelectWithFormHookProps = SelectProps & {
  control: Control;
  controllerName: string;
};

export default function SelectWithFormHook({
  control,
  controllerName,
  onChange: onValueChange,
  ...rest
}: SelectWithFormHookProps) {
  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange, value } }) => (
        <Select
          onChange={(e) => (onChange(e.target.value), onValueChange?.(e))}
          value={value}
          {...rest}
        />
      )}
    />
  );
}
