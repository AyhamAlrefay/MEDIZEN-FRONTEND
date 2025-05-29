import { Stack } from "@mui/material";
import ObservationDefinitionsDetails from "../Components/ObservationDefinitionsShow/ObservationDefinitionsDetails";
import { PageLoader } from "@/shared/components/PageLoader";
import { useParams } from "react-router-dom";
import { useObservationDefinitionsService } from "@/services/observationDefinitions/observationDefinitions.service";

const ObservationDefinitionsShow = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useObservationDefinitionsService()
    .indexOne()
    .useQuery(Number(id));

  if (isLoading) return <PageLoader />;
  return (
    <Stack>
      <ObservationDefinitionsDetails
        data={data?.data?.observation_definition}
      />
    </Stack>
  );
};

export default ObservationDefinitionsShow;
