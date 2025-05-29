import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import defaultImage from "@/assets/person.png";
import ActiveToggle from "../ActiveToggle";
import { PagesRoutes } from "@/constants/pages-routes";
import { useHealthCareService } from "@/services/healthCare/healthCare.service";
import { HealthCare } from "@/services/healthCare/healthCare.types";
import ClinicTable from "./ClinicTable";
import { Code } from "@/services/codes/codes.types";
import { Can } from "@/can/Can";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";
import { useCan } from "@/can/useCan";
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

interface HealthCareDetailsProps {
  data?: HealthCare;
}

export const HealthCareDetails = (props: HealthCareDetailsProps) => {
  const { data } = props;
  const invalidate = useHealthCareService().indexOne().invalidate;
  const { can: isCanActiveToggle } = useCan({
    action:
      SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
        Actions.TOGGLE_HEALTH_CARE_SERVICE_STATUS
      ],
  });
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
            Health Care Service Details
          </Typography>
          <Can
            action={
              SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
                Actions.EDIT_HEALTH_CARE_SERVICE
              ]
            }
          >
            <Link
              to={`${PagesRoutes.healthCare.children.update.path}/${data?.id}`}
            >
              <Stack direction="row" alignItems="center">
                <EditIcon color="primary" />
              </Stack>
            </Link>
          </Can>
        </Stack>
        <Stack
          direction="column"
          sx={{
            gap: "2rem",
            textTransform: "capitalize",
            flexWrap: "wrap",
          }}
        >
          <Box mt="1rem">
            <Box
              component="img"
              alt="profile img"
              src={data?.photo ?? defaultImage}
              sx={{
                height: 120,
                width: 120,
                objectFit: "cover",
                borderRadius: ".5rem",
              }}
            />
          </Box>
          <Box>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox label={"Name"} value={data?.name} />
              <DisplayBox label={"Comment"} value={data?.comment} />
              <DisplayBox label={"Extra Details"} value={data?.extra_details} />
            </Stack>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox label={"Price"} value={data?.price} />
              <DisplayBox label={"Category"} value={data?.category?.display} />
              <DisplayBox
                label={"Appointment Required"}
                value={data?.appointmentRequired ? "yes" : "No"}
              />
            </Stack>
            {!isCanActiveToggle && (
              <Stack
                direction={"row"}
                rowGap="1.25rem"
                mb="2.5rem"
                flexWrap={"wrap"}
              >
                <DisplayBox
                  label={"Active"}
                  value={data?.active ? "yes" : "no"}
                />
              </Stack>
            )}
          </Box>
        </Stack>
      </Box>
      <Can
        action={
          SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
            Actions.TOGGLE_HEALTH_CARE_SERVICE_STATUS
          ]
        }
      >
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
          <Stack mt={1} direction={"row"} alignItems={"center"}>
            <Typography variant="subtitle1" color="text.darkGray">
              Active Status
            </Typography>
            <ActiveToggle
              onSuccess={() => data?.id && invalidate(data?.id)}
              active={data?.active ?? 0}
              id={data?.id}
            />
          </Stack>
        </Box>
      </Can>

      <ClinicTable clinic={data?.clinic} />
      <Box
        sx={{
          py: 2,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 6,
        }}
      >
        <Typography variant="h6" color="primary" sx={{ px: 2 }}>
          Eligibilities
        </Typography>
        <List>
          {data?.eligibilities?.map((item: Code, index: number) => (
            <>
              <ListItem alignItems="flex-start" key={item.id}>
                <ListItemText
                  primary={item.display}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "gray", display: "inline" }}
                    >
                      {item.description}
                    </Typography>
                  }
                />
              </ListItem>
              {index < data.eligibilities.length - 1 && (
                <Divider variant="middle" />
              )}
            </>
          ))}
        </List>
      </Box>
    </Stack>
  );
};
