import { Stack } from "@mui/material";
import { PractitionerCard } from "../components/PractitionerShow/PractitionerCard";
import { PageLoader } from "@/shared/components/PageLoader";
import { usePractitionerService } from "@/services/practitioner/practitioner.service";
import { useParams } from "react-router-dom";

const PractitionerShow = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = usePractitionerService()
    .indexOne()
    .useQuery(Number(id));

  if (isLoading) return <PageLoader />;
  return (
    <Stack>
      <PractitionerCard data={data?.data?.practitioner} />
    </Stack>
  );
};

export default PractitionerShow;
