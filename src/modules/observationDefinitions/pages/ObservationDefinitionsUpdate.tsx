import { ObservationDefinitions } from "@/services/observationDefinitions/observationDefinitions.types";
import { PageLoader } from "@/shared/components/PageLoader";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ObservationDefinitionsForm } from "../Components/ObservationDefinitionsForm/ObservationDefinitionsForm";
import { useUpdateObservationDefinitions } from "../hooks/useUpdateObservationDefinitions";
import { useObservationDefinitionsService } from "@/services/observationDefinitions/observationDefinitions.service";
const ObservationDefinitionsUpdate = ({
  observationDefinition,
}: {
  observationDefinition: ObservationDefinitions;
}) => {
  const navigate = useNavigate();
  const { isLoading, formSchema, methods, onSubmit } =
    useUpdateObservationDefinitions({
      observationDefinition,
    });

  return (
    <Stack sx={{ bgcolor: "white", borderRadius: 6, p: "28px 26px" }}>
      <Stack direction="row" justifyContent="space-between" mb="1rem">
        <Typography variant="h6" color="primary">
          Edit Observation Definition
        </Typography>
      </Stack>
      <ObservationDefinitionsForm
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
              onClick={() => navigate(-1)}
              sx={{ paddingX: 7, paddingY: 1 }}
              variant="outlined"
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
  );
};

const _ObservationDefinitionsUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useObservationDefinitionsService()
    .indexOne()
    .useQuery(Number(id));
  if (isLoading) return <PageLoader />;
  if (data)
    return (
      <ObservationDefinitionsUpdate
        observationDefinition={data?.data?.observation_definition}
      />
    );

  return null;
};
export default _ObservationDefinitionsUpdate;
