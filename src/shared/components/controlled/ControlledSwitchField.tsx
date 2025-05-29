/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent } from "react";

import { Switch, FormControlLabel, type SwitchProps } from "@mui/material";
import {
  Controller,
  type ControllerProps,
  type FieldValues,
} from "react-hook-form";

export interface ControlledSwitchProps<Form extends FieldValues>
  extends Omit<SwitchProps, "color"> {
  /**
   * This will allow you to provide this `import { Controller } from 'react-hook-form';` with it's props
   */
  controllerProps: Omit<ControllerProps<Form>, "render"> & {
    /**
     * This will allow you to show the label
     */
    schema?: unknown;
  };
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Description
 * - This component wraps `Switch` to make it controlled by React Hook Form
 */
export function ControlledSwitch<Form extends FieldValues>(
  props: ControlledSwitchProps<Form>,
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

  const label = eval(`${labelPath}?.spec?.label ?? controllerProps.name`);
  const isRequired = eval(`${labelPath}?.exclusiveTests?.required`);

  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value, ref }, fieldState: {} }) => (
        <FormControlLabel
          control={
            <Switch
              {...rest}
              checked={!!value} // عرض الحالة: true إذا كانت القيمة 1
              onChange={(e) => {
                onChange(e.target.checked ? 1 : 0); // تمرير 1 أو 0
                onInputChange?.(e);
              }}
              inputRef={ref}
              color="primary"
            />
          }
          label={label + (isRequired ? " *" : "")}
        />
      )}
    />
  );
}
