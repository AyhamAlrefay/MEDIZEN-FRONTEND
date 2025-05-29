import { Button, Stack } from "@mui/material";
import PageHeader from "@/shared/components/PageHeader";
import { useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants";
import ObservationDefinitionsTable from "../Components/ObservationDefinitionsIndex/ObservationDefinitionsTable";
const ObservationDefinitionsIndex = () => {
  const navigate = useNavigate();
  const handleNavigateToCreateObservationDefinition = () => {
    navigate(PagesRoutes.observationDefinitions.children.create.path);
  };
  return (
    <Stack sx={{ p: "28px 26px", bgcolor: "white", borderRadius: 6 }}>
      <PageHeader
        title="Observation Definitions"
        action={
          <Button
            sx={{ px: 4, py: 1 }}
            variant="contained"
            onClick={handleNavigateToCreateObservationDefinition}
          >
            Add Observation Definition
          </Button>
        }
      />
      <ObservationDefinitionsTable />
    </Stack>
  );
};

export default ObservationDefinitionsIndex;
