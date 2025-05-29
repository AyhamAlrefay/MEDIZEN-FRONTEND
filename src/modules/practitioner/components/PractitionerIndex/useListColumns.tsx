import { type GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { Practitioner } from "@/services/practitioner/practitioner.types";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { PagesRoutes } from "@/constants";
import ActiveToggle from "../ActiveToggle";
import DeceasedToggle from "../DeceasedToggle";
import UpdatePractitionerRoleDialog from "./UpdatePractitionerRoleDialog";
import EmailIcon from "@mui/icons-material/Email";
import PractitionerVerifyDialog from "../PractitionerVerifyDialog/PractitionerVerifyDialog";
import { usePractitionerService } from "@/services/practitioner/practitioner.service";
import { useState } from "react";
/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [index, setIndex] = useState(0);
  const invalidate = usePractitionerService().index().invalidate;
  const columns: GridColDef<Practitioner>[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 1,
      renderCell({ row }) {
        return (
          <Box
            component="img"
            alt="avatar img"
            src={row?.avatar ?? "-"}
            sx={{
              height: 50,
              width: 50,
              objectFit: "cover",
              borderRadius: ".5rem",
            }}
          />
        );
      },
    },
    {
      field: "prefix",
      headerName: "Prefix",
      flex: 1,
    },
    {
      field: "f_name",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "l_name",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      flex: 1,
    },
    {
      field: "deceasedStatus",
      headerName: "Deceased Status",
      renderCell({ row }) {
        return (
          <DeceasedToggle
            onSuccess={invalidate}
            deceased={row.deceased_date}
            id={row.id}
          />
        );
      },
    },
    {
      field: "deceased_date",
      headerName: "Deceased Date",
      flex: 1,
      renderCell({ row }) {
        return row?.deceased_date ?? "-";
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "activeStatus",
      headerName: "Active Status",
      renderCell({ row }) {
        return (
          <ActiveToggle
            onSuccess={invalidate}
            active={row.active}
            id={row.id}
          />
        );
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      renderCell({ row }) {
        return row?.gender?.display;
      },
    },
    {
      field: "clinic",
      headerName: "Clinic",
      renderCell({ row }) {
        return row?.clinic?.name;
      },
    },
    {
      field: "role",
      headerName: "Role",
      renderCell({ row }) {
        return row?.roles?.[0]?.name;
      },
    },
    {
      field: "email_verified_at",
      headerName: "Verified",
      renderCell({ row }) {
        return row?.email_verified_at ? (
          <Chip label="Yes" size="small" color="success" variant="filled" />
        ) : (
          <Chip label="No" size="small" color="error" variant="filled" />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell({ row }) {
        return (
          <Box>
            <IconButton
              color="primary"
              onClick={() =>
                navigate(
                  PagesRoutes.practitioner.children.show.path + "/" + row.id,
                )
              }
            >
              <RemoveRedEyeIcon />
            </IconButton>
            {row.roles?.[0]?.id && (
              <UpdatePractitionerRoleDialog practitioner={row} />
            )}
            <PractitionerVerifyDialog
              opened={openDialog && index === row.id}
              onClose={() => {
                setOpenDialog(false);
              }}
              email={row.email ?? ""}
              onVerifySuccess={() => {
                invalidate();
              }}
              actionBtn={
                <Tooltip title="Verify Email">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setOpenDialog(true);
                      setIndex(row.id ?? 0);
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </Box>
        );
      },
    },
  ];

  return { columns };
};
