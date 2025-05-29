import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Card,
} from "@mui/material";
import {
  Controller,
  type ControllerProps,
  type FieldValues,
  type Path,
} from "react-hook-form";

export interface ControlledRangeFieldProps<Form extends FieldValues> {
  controllerProps: {
    control: ControllerProps<Form>["control"];
    name: Path<Form>;
    schema?: any;
  };
}

const UNIT_OPTIONS = ["years", "months"];

function ControlledRangeField<Form extends FieldValues>({
  controllerProps,
}: ControlledRangeFieldProps<Form>) {
  const { control, name, schema } = controllerProps;

  const splattedName = name.split(".");
  const labelPath = splattedName.reduce((acc, curr, index) => {
    if (index === 0) return `${acc}['${curr}']`;
    return `${acc}?.fields['${curr}']`;
  }, "schema?.fields");

  let label = name;
  let isRequired = false;

  try {
    label = eval(`${labelPath}?.spec?.label`) ?? name;
    isRequired = eval(`${labelPath}?.exclusiveTests?.required`) ?? false;
  } catch (e) {}

  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {label + (isRequired ? " *" : "")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Minimum
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name={`${name}.low.value` as Path<Form>}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      size="small"
                      label="Value"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message ?? ""}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`${name}.low.unit` as Path<Form>}
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl
                      fullWidth
                      size="small"
                      error={!!fieldState.error}
                    >
                      <Select {...field} displayEmpty>
                        <MenuItem value="" disabled>
                          Unit
                        </MenuItem>
                        {UNIT_OPTIONS.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {fieldState.error?.message ?? ""}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Maximum
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name={`${name}.high.value` as Path<Form>}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      size="small"
                      label="Value"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message ?? ""}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`${name}.high.unit` as Path<Form>}
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl
                      fullWidth
                      size="small"
                      error={!!fieldState.error}
                    >
                      <Select {...field} displayEmpty>
                        <MenuItem value="" disabled>
                          Unit
                        </MenuItem>
                        {UNIT_OPTIONS.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {fieldState.error?.message ?? ""}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ControlledRangeField;
