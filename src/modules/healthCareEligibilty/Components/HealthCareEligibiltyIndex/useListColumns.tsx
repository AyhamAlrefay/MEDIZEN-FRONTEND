import { type GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { HealthCareEligibilty } from "@/services/healthCareEligibilty/healthCareEligibilty.types";
import HealthCareEligibiltyUpdateDialog from "../HealthCareEligibiltyIndex/HealthCareEligibiltyUpdateDialog";
import HealthCareEligibiltyDeleteDialog from "../HealthCareEligibiltyIndex/HealthCareEligibiltyDeleteDialog";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";
import { Can } from "@/can/Can";
import { useCan } from "@/can/useCan";
/**
 *
 * This hook might look messy so please if you find anything hard to understand check the following link
 * and Everything will be fine
 * @see See {@link https://mui.com/x/react-data-grid/column-definition/ DataGrid column docs} for more details.
 *
 */

export const useListColumns = () => {
  const { can: isActions } = useCan({
    action:
      SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
        Actions.EDIT_HEALTH_CARE_SERVICE_ELIGIBILITY
      ] &&
      SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
        Actions.DELETE_HEALTH_CARE_SERVICE_ELIGIBILITY
      ],
  });

  const columns: GridColDef<HealthCareEligibilty>[] = [
    {
      field: "comment",
      headerName: "Comment",
      flex: 1,
    },
    {
      field: "health_care_service",
      headerName: "health Care Service",
      flex: 1,
      renderCell({ row }) {
        return row.health_care_service.name;
      },
    },
    ...(isActions
      ? [
          {
            field: "actions",
            headerName: "Actions",
            renderCell({ row }: { row: HealthCareEligibilty }) {
              return (
                <Stack direction={"row"}>
                  <Can
                    action={
                      SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
                        Actions.EDIT_HEALTH_CARE_SERVICE_ELIGIBILITY
                      ]
                    }
                  >
                    <HealthCareEligibiltyUpdateDialog
                      healthCareEligibilty={row}
                    />
                  </Can>
                  <Can
                    action={
                      SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
                        Actions.DELETE_HEALTH_CARE_SERVICE_ELIGIBILITY
                      ]
                    }
                  >
                    <HealthCareEligibiltyDeleteDialog
                      healthCareEligibilty={row}
                    />
                  </Can>
                </Stack>
              );
            },
          },
        ]
      : []),
  ];

  return { columns };
};
