import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers";
import {
  Controller,
  type ControllerProps,
  type FieldValues,
} from "react-hook-form";
import type { TextFieldProps } from "@mui/material";

export type ControlledDateFieldProps<Form extends FieldValues> = Omit<
  DatePickerProps<any, any>,
  "value" | "renderInput" | "onChange"
> & {
  /**
   * This will allow you to provide this `import { Controller } from 'react-hook-form';` with it's props
   */
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    /**
     * This will allow you to show the label
     */
    schema?: any;
  };
  onChange?: Pick<DatePickerProps<any, any>, "onChange">["onChange"];

  /**
   * These parameter will give you access to mui input props
   */
  textFieldProps?: TextFieldProps;
};

/**
 * Description
 * - This component wrap `DatePicker` to make it controlled by React Hook form
 * -
 */
export const ControlledDateField = <Form extends FieldValues>(
  props: ControlledDateFieldProps<Form>,
) => {
  const { controllerProps: _controllerProps, textFieldProps, ...rest } = props;

  const { schema, ...controllerProps } = _controllerProps;

  const splattedName = controllerProps?.name.split(".");
  const labelPath = splattedName.reduce((acc, curr, index) => {
    if (index === 0) {
      return `${acc}['${curr}']`;
    } else {
      return `${acc}?.fields['${curr}']`;
    }
  }, "schema?.fields");
  // get label form schema label if it founded else get label from control props
  const schemaLabel = eval(`${labelPath}?.spec?.label`);
  const controlLabel = eval(`controllerProps.name`);
  const isRequired = eval(`${labelPath}?.exclusiveTests?.required`);

  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <DatePicker
          {...rest}
          value={value ?? null}
          onChange={(...arg) => {
            onChange(arg[0]);
            rest?.onChange?.(...arg);
          }}
          inputRef={ref}
          slotProps={{
            textField: {
              label: (schemaLabel ?? controlLabel) + (isRequired ? " *" : ""),
              variant: "standard",
              size: "small",
              error: !!error?.message,
              helperText:
                error?.message?.toString() ??
                `enter ${schemaLabel ?? controlLabel}`,
              ...textFieldProps,
            },
          }}
        />
      )}
    />
  );
};

ControlledDateField.defaultProps = {
  PopperProps: {
    keepMounted: true,
    disablePortal: true,
  },
};
