import { Control, Controller } from 'react-hook-form';
import Input, { InputProps } from './Input';

export type InputWithFormHookProps = InputProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  controllerName: string;
};

export default function InputWithFormHook({
  control,
  controllerName,
  onChange: onTextChange,
  ...rest
}: InputWithFormHookProps): React.JSX.Element {
  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          onChange={(e) => (onChange(e.target.value), onTextChange?.(e))}
          value={value ?? ''}
          error={error?.message}
          {...rest}
        />
      )}
    />
  );
}
