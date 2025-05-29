import { Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateQualifiedValues } from "../hooks/useCreateQualifiedValues";
import { QualifiedValuesForm } from "../Components/ObservationDefinitionsShow/QualifiedValues/QualifiedValuesForm/QualifiedValuesForm";

const QualifiedValuesCreate = () => {
  const { id } = useParams<{ id: string }>();

  const { formSchema, isLoading, methods, onSubmit } = useCreateQualifiedValues(
    Number(id)
  );

  const navigate = useNavigate();
  return (
    <Stack sx={{ bgcolor: "white", borderRadius: 6, p: "28px 26px" }}>
      <Stack mb="1rem">
        <Typography variant="h6" color="primary">
          Create Qualified Values
        </Typography>
        <QualifiedValuesForm
          formSchema={formSchema}
          methods={methods}
          onSubmit={onSubmit}
          actionsComponent={
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                mt: "5rem",
                columnGap: "1.75rem",
              }}
            >
              <Button
                type="button"
                sx={{ paddingX: 7, paddingY: 1 }}
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                cancel
              </Button>
              <Button
                type="submit"
                sx={{ paddingX: 7, paddingY: 1 }}
                variant="contained"
                disabled={isLoading}
              >
                save
              </Button>
            </Stack>
          }
        />
      </Stack>
    </Stack>
  );
};

export default QualifiedValuesCreate;
