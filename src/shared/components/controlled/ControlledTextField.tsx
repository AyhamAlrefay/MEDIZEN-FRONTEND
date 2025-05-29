/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TextField,
  TextFieldVariants,
  type TextFieldProps,
} from "@mui/material";
import {
  Controller,
  type ControllerProps,
  type FieldValues,
} from "react-hook-form";

export interface ControlledTextFieldProps<Form extends FieldValues>
  extends Omit<TextFieldProps<"standard">, "variant"> {
  /**
   * This will allow you to provide this `import { Controller } from 'react-hook-form';` with it's props
   */
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    /**
     * This will allow you to show the label
     */
    schema?: unknown;
  };
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  variant?: TextFieldVariants;
}

/**
 * Description
 * - This component wrap `TextField` to make it controlled by React Hook form
 * -
 */
export function ControlledTextField<Form extends FieldValues>(props: ControlledTextFieldProps<Form>) {
  const { controllerProps: _controllerProps, onInputChange, ...rest } = props;

  const { schema, ...controllerProps } = _controllerProps;

  const splattedName = controllerProps?.name.split(".");
  const labelPath = splattedName.reduce((acc, curr, index) => {
    if (index === 0) {
      return `${acc}['${curr}']`;
    } else {
      return `${acc}?.fields['${curr}']`;
    }
  }, "schema?.fields");

  const label = eval(`${labelPath}?.spec?.label??controllerProps.name`);
  const isRequired = eval(`${labelPath}?.exclusiveTests?.required`);

  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          variant="standard"
          size="small"
          error={!!error?.message}
          value={value ?? ""}
          onChange={(e) => {
            onChange(e.target.value);
            onInputChange?.(e);
          }}
          label={label + (isRequired ? " *" : "")}
          helperText={error?.message?.toString() ?? `Enter ${label}`}
          inputRef={ref}
          {...rest}
        />
      )}
    />
  );
}
