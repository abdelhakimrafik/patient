import { Control, Controller } from 'react-hook-form';

import Select, { SelectProps } from './Select';

export type SelectWithFormHookProps = SelectProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          onChange={(e) => (onChange(e.target.value), onValueChange?.(e))}
          value={value}
          error={error?.message}
          {...rest}
        />
      )}
    />
  );
}
