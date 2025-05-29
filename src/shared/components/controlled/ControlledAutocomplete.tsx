import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import Autocomplete, {
  type AutocompleteProps,
} from "@mui/material/Autocomplete";
import {
  Controller,
  type ControllerProps,
  type FieldValues,
} from "react-hook-form";

export interface ControlledAutocompleteProps<Form extends FieldValues>
  extends Omit<AutocompleteProps<any, any, any, any>, "renderInput"> {
  /**
   * This will allow you to provide this `import { Controller } from 'react-hook-form';` with it's props
   */
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    /**
     * This will allow you to show the label
     */
    schema?: any;
  };

  /**
   * These parameter will give you access to mui input props
   */
  textFieldProps?: TextFieldProps;
}

/**
 * Description
 * - This component wrap `Autocomplete` to make it controlled by React Hook form
 * -
 */
export const ControlledAutocomplete = <Form extends FieldValues>(
  props: ControlledAutocompleteProps<Form>,
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
        <Autocomplete
          disablePortal
          {...rest}
          value={value ?? null}
          onChange={(...arg) => {
            onChange(arg[1]);
            rest.onChange?.(...arg);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              size="small"
              error={!!error?.message}
              label={(schemaLabel ?? controlLabel) + (isRequired ? " *" : "")}
              helperText={
                error?.message?.toString() ??
                `enter ${schemaLabel ?? controlLabel}`
              }
              inputRef={ref}
              {...textFieldProps}
            />
          )}
        />
      )}
    />
  );
};
