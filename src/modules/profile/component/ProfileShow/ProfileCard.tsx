import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { PagesRoutes } from "@/constants";
import { User } from "@/services/user/user.types";
import defaultImage from "@/assets/person.png";
import QualificationsTable from "./QualificationsTable";

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

interface ProfileCardProps {
  me?: User;
}
export const ProfileCard = (props: ProfileCardProps) => {
  const { me } = props;

  const fullName = `${me?.prefix ?? ""} ${me?.f_name ?? ""} ${me?.l_name ?? ""} ${me?.suffix ?? ""}`;
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
            Profile
          </Typography>
          <Link to={PagesRoutes.profile.children.update.path}>
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
              src={me?.avatar ?? defaultImage}
              sx={{
                height: 160,
                width: 160,
                objectFit: "cover",
                borderRadius: ".5rem",
              }}
            />
          </Box>
          <Stack rowGap="1.25rem" justifyContent="flex-end" mb="2.5rem">
            <DisplayBox label={"Full name"} value={fullName} />
            <DisplayBox label={"Email"} value={me?.email} />
            <DisplayBox label={"Description"} value={me?.text} />
            <DisplayBox label={"Date of birth"} value={me?.date_of_birth} />
            <DisplayBox label={"Address"} value={me?.address} />
            <DisplayBox label={"Gender"} value={me?.gender?.display} />
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
        <Typography variant="h6" color="primary">
          Communications
        </Typography>
        <Stack maxWidth={400}>
          {me?.communications?.map((c) => (
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
      <QualificationsTable qualifications={me?.qualifications ?? []} />
    </Stack>
  );
};
