import { PagesRoutes } from "@/constants";
import { useObservationDefinitionsService } from "@/services/observationDefinitions/observationDefinitions.service";
import { ObservationDefinitions } from "@/services/observationDefinitions/observationDefinitions.types";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ActiveToggle from "../ActiveToggle";
import QualifiedValuesTable from "./QualifiedValues/QualifiedValuesTable";
interface Props {
  data?: ObservationDefinitions;
}
const DisplayBox = ({ value, label }: { value: any; label: string }) => {
  return value ? (
    <Stack direction="row" alignItems="start" minWidth={400}>
      <Typography minWidth={130} variant="subtitle1" color="primary">
        {label} :
      </Typography>
      <Typography variant="body1" maxWidth={270} color="text.darkGray">
        {value}
      </Typography>
    </Stack>
  ) : null;
};
const ObservationDefinitionsDetails = ({ data }: Props) => {
  const navigate = useNavigate();
  const invalidate = useObservationDefinitionsService().indexOne().invalidate;
  const handleNavigateToCreateQualifiedValues = () => {
    const path = `${PagesRoutes.observationDefinitions.path}/${data?.id}${PagesRoutes.observationDefinitions.children.createAualifiedValues.path}`;
    navigate(path);
  };

  return (
    <Stack gap="16px">
      <Box
        sx={{
          borderRadius: 6,
          p: "28px 26px",
          bgcolor: "white",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" color="primary">
            Observation Definition
          </Typography>

          <Link
            to={`${PagesRoutes.observationDefinitions.children.update.path}/${data?.id}`}
          >
            <Stack direction="row" alignItems="center">
              <EditIcon color="primary" />
            </Stack>
          </Link>
        </Stack>
        <Stack
          mt={5}
          direction="row"
          sx={{
            gap: "5rem",
            textTransform: "capitalize",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox label={"Name"} value={data?.name} />
              <DisplayBox label={"Version"} value={data?.version} />
              <DisplayBox label={"Title"} value={data?.title} />
            </Stack>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox
                label={"Last Renew Date"}
                value={data?.last_renew_date ? data.last_renew_date : "-"}
              />
              <DisplayBox label={"Purpose"} value={data?.purpose} />
              <DisplayBox label={"Description"} value={data?.description} />
            </Stack>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox
                label={"Preferred Report Name"}
                value={data?.preferred_report_name}
              />
              <DisplayBox label={"Type"} value={data?.type.display} />
              <DisplayBox
                label={"Classification"}
                value={data?.classification.display}
              />
            </Stack>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox label={"Method"} value={data?.method.display} />
              <DisplayBox label={"Body Site"} value={data?.body_site.display} />
              <DisplayBox
                label={"Permitted Unit"}
                value={data?.permitted_unit.display}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          borderRadius: 6,
          p: "28px 26px",
          bgcolor: "white",
        }}
      >
        <Typography variant="h6" color="primary">
          Status
        </Typography>
        <Stack mt={1} direction={"row"} gap={4} flexWrap={"wrap"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1" color="text.darkGray">
              Active Status
            </Typography>
            <ActiveToggle
              onSuccess={() => data?.id && invalidate(data?.id)}
              active={data?.status.id == 90 ? 1 : 0}
              id={data?.id}
            />
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          borderRadius: 6,
          p: "28px 26px",
          bgcolor: "white",
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Typography variant="h6" color="primary">
            Qualified Values
          </Typography>
          <Box mt={2}>
            <Button
              sx={{ px: 4, py: 1, my: 2 }}
              variant="contained"
              onClick={handleNavigateToCreateQualifiedValues}
            >
              Add Qualified Values
            </Button>
          </Box>
        </Stack>
        <QualifiedValuesTable id={data?.id} />
      </Box>
    </Stack>
  );
};

export default ObservationDefinitionsDetails;
