import { ChangeEvent } from "react";

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

export interface ControlledNumberFieldProps<Form extends FieldValues>
  extends Omit<TextFieldProps<"standard">, "variant" | "type"> {
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    schema?: unknown;
  };
  onInputChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  variant?: TextFieldVariants;
}

/**
 * Description
 * - This component wraps `TextField` for numeric input controlled by React Hook Form
 */
export function ControlledNumberField<Form extends FieldValues>(
  props: ControlledNumberFieldProps<Form>
) {
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
          type="number"
          error={!!error?.message}
          value={value ?? ""}
          onChange={(e) => {
            const numberValue =
              e.target.value === "" ? "" : Number(e.target.value);
            onChange(numberValue);
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
