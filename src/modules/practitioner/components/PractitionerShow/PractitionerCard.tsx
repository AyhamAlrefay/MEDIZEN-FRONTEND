import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import defaultImage from "@/assets/person.png";
import { Practitioner } from "@/services/practitioner/practitioner.types";
import { usePractitionerService } from "@/services/practitioner/practitioner.service";
import TelecomsTable from "./TelecomsTable";
import QualificationsTable from "@/modules/practitioner/components/PractitionerShow/QualificationsTable";
import ActiveToggle from "../ActiveToggle";
import DeceasedToggle from "../DeceasedToggle";

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

interface PractitionerCardProps {
  data?: Practitioner;
}

export const PractitionerCard = (props: PractitionerCardProps) => {
  const { data } = props;
  const invalidate = usePractitionerService().indexOne().invalidate;
  const fullName = `${data?.prefix ?? ""} ${data?.f_name ?? ""} ${data?.l_name ?? ""} ${data?.suffix ?? ""}`;

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
            Practitioner
          </Typography>
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
              <DisplayBox label={"Clinic"} value={data?.clinic?.name} />
              <DisplayBox label={"Email"} value={data?.email} />
            </Stack>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox label={"Description"} value={data?.text} />
              <DisplayBox label={"Date of birth"} value={data?.date_of_birth} />
              <DisplayBox label={"Address"} value={data?.address} />
            </Stack>
            <Stack
              direction={"row"}
              rowGap="1.25rem"
              mb="2.5rem"
              flexWrap={"wrap"}
            >
              <DisplayBox label={"Gender"} value={data?.gender?.display} />
              <DisplayBox label={"Role"} value={data?.roles?.[0]?.name} />
              <DisplayBox
                label={"Active"}
                value={data?.active ? "yes" : "no"}
              />
            <DisplayBox label={"Deceased Date"} value={data?.deceased_date} />
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
          Communications
        </Typography>
        <Stack maxWidth={400}>
          {data?.communications?.map((c) => (
            <Stack
              key={c.id}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle1" color="text.darkGray">
                {c.language.display}
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={c.preferred} />}
                label="Preferred"
              />
            </Stack>
          ))}
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
              onSuccess={data?.id && invalidate(data?.id)}
              active={data?.active}
              id={data?.id}
            />
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1" color="text.darkGray">
              Deceased Status
            </Typography>
            <DeceasedToggle
              onSuccess={data?.id && invalidate(data?.id)}
              deceased={data?.deceased_date}
              id={data?.id}
            />
          </Stack>
        </Stack>
      </Box>
      <TelecomsTable telecoms={data?.telecoms} />
      <QualificationsTable qualifications={data?.qualifications ?? []} />
    </Stack>
  );
};
