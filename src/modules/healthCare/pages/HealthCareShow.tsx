import { Stack } from "@mui/material";
import { HealthCareDetails } from "../Components/HealthCareShow/HealthCareDetails";
import { PageLoader } from "@/shared/components/PageLoader";
import { useHealthCareService } from "@/services/healthCare/healthCare.service";
import { useParams } from "react-router-dom";

const HealthCareShow = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useHealthCareService()
    .indexOne()
    .useQuery(Number(id));

  if (isLoading) return <PageLoader />;
  return (
    <Stack>
      <HealthCareDetails data={data?.data?.healthCareService} />
    </Stack>
  );
};

export default HealthCareShow;
