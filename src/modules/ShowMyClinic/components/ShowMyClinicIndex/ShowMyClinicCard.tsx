import { Box, Stack, Typography } from "@mui/material";
import { useShowMyClinicService } from "@/services/showMyClinic/showMyClinic.service";
import defaultImage from "@/assets/healthCare.jpg";
import { PageLoader } from "@/shared/components/PageLoader";
import HealthCareServicesTable from "./HealthCareTable";
const DisplayBox = ({ value, label }: { value: any; label: string }) => {
  return value ? (
    <Stack direction="row" alignItems="center">
      <Typography minWidth={150} variant="subtitle1" color="primary">
        {label} :
      </Typography>
      <Typography variant="body1" color="text.darkGray">
        {value}
      </Typography>
    </Stack>
  ) : null;
};
function ShowMyClinicCard() {
  const { data, isLoading } = useShowMyClinicService().index().useQuery();
  if (isLoading) return <PageLoader />;
  const myClinic = data?.data?.clinic;

  return (
    <Stack gap="16px">
      <Typography
        variant="h6"
        color="primary"
        sx={{
          borderRadius: 6,
          p: "28px 26px",
          bgcolor: "white",
        }}
      >
        My Clinic
      </Typography>
      <Box
        sx={{
          borderRadius: 6,
          p: "28px 26px",
          bgcolor: "white",
        }}
      >
        <Typography variant="h6" color="primary">
          Info
        </Typography>
        <Stack
          direction="row"
          sx={{
            gap: "5rem",
            textTransform: "capitalize",
            flexWrap: "wrap",
          }}
        >
          <Box mt="1rem">
            <Box
              component="img"
              alt="clinic img"
              src={myClinic?.photo ?? defaultImage}
              sx={{
                height: 160,
                width: 160,
                objectFit: "cover",
                borderRadius: ".5rem",
              }}
            />
          </Box>
          <Stack rowGap="1.25rem" justifyContent="flex-end" mb="2.5rem">
            <DisplayBox label={"Name"} value={myClinic?.name} />
            <DisplayBox label={"Description"} value={myClinic?.description} />
            <DisplayBox
              label={"Active"}
              value={myClinic?.active ? "yes" : "no"}
            />
          </Stack>
        </Stack>
      </Box>
      <HealthCareServicesTable data={myClinic?.healthCareServices} />
    </Stack>
  );
}

export default ShowMyClinicCard;
