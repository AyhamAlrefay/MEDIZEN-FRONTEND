import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import defaultImage from "@/assets/person.png";
import TelecomsTable from "./TelecomsTable";
import ActiveToggle from "../ActiveToggle";
import DeceasedToggle from "../DeceasedToggle";
import { Patient } from "@/services/patients/patients.types";
import { PagesRoutes } from "@/constants/pages-routes";
import { usePatientService } from "@/services/patients/patients.service";
import { Can } from "@/can/Can";
import { Subjects, SubjectToActions, Actions } from "@/can/permissions";
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

interface PatientCardProps {
  data?: Patient;
}

export const PatientCard = (props: PatientCardProps) => {
  const { data } = props;
  const invalidate = usePatientService().indexOne().invalidate;
  const fullName = `${data?.prefix ?? ""} ${data?.f_name ?? ""} ${
    data?.l_name ?? ""
  } ${data?.suffix ?? ""}`;
  const { can: isCanActiveToggle } = useCan({
    action:
      SubjectToActions[Subjects.PATIENT_MANAGEMENT][
        Actions.TOGGLE_PATIENT_STATUS
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
            Patient Profile
          </Typography>

          <Link to={`${PagesRoutes.patients.children.update.path}/${data?.id}`}>
            <Stack direction="row" alignItems="center">
              <EditIcon color="primary" />
            </Stack>
          </Link>
        </Stack>
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
              alt="profile img"
              src={data?.avatar ?? defaultImage}
              sx={{
                height: 160,
                width: 160,
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
              <DisplayBox label={"Full name"} value={fullName} />
              <DisplayBox label={"Email"} value={data?.email} />
              <DisplayBox label={"Description"} value={data?.text} />
            </Stack>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox label={"Date of birth"} value={data?.date_of_birth} />
              <DisplayBox label={"Gender"} value={data?.gender?.display} />
              <DisplayBox
                label={"Alcohol Drinker"}
                value={data?.alcohol_drinker ? "yes" : "no"}
              />
            </Stack>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox
                label={"Marital Status"}
                value={data?.marital_status.display}
              />
              <DisplayBox label={"Blood"} value={data?.blood.display} />
              <DisplayBox
                label={"Smoker"}
                value={data?.smoker ? "yes" : "no"}
              />
            </Stack>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox label={"Height"} value={data?.height} />
              <DisplayBox label={"Weight"} value={data?.weight} />
              <DisplayBox label={"Deceased Date"} value={data?.deceased_date} />
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
          SubjectToActions[Subjects.PATIENT_MANAGEMENT][
            Actions.TOGGLE_PATIENT_STATUS
          ] &&
          SubjectToActions[Subjects.PATIENT_MANAGEMENT][
            Actions.TOGGLE_PATIENT_DECEASED_STATUS
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
          <Stack mt={1} direction={"row"} gap={4} flexWrap={"wrap"}>
            <Can
              action={
                SubjectToActions[Subjects.PATIENT_MANAGEMENT][
                  Actions.TOGGLE_PATIENT_STATUS
                ]
              }
            >
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
                  active={data?.active ?? 0}
                  id={data?.id}
                />
              </Stack>
            </Can>
            <Can
              action={
                SubjectToActions[Subjects.PATIENT_MANAGEMENT][
                  Actions.TOGGLE_PATIENT_DECEASED_STATUS
                ]
              }
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="subtitle1" color="text.darkGray">
                  Deceased Status
                </Typography>
                <DeceasedToggle
                  onSuccess={() => data?.id && invalidate(data?.id)}
                  deceased={data?.deceased_date}
                  id={data?.id}
                />
              </Stack>
            </Can>
          </Stack>
        </Box>
      </Can>

      <TelecomsTable telecoms={data?.telecoms} />
    </Stack>
  );
};
