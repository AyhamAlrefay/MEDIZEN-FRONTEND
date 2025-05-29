import { PageLoader } from "@/shared/components/PageLoader";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { QualifiedValuesForm } from "../Components/ObservationDefinitionsShow/QualifiedValues/QualifiedValuesForm/QualifiedValuesForm";
import { useUpdateQualifiedValues } from "../hooks/useUpdateQualifiedValues";
import { useQualifiedValuesService } from "@/services/qualifiedValues/qualifiedValues.service";
import { QualifiedValues } from "@/services/qualifiedValues/qualifiedValues.types";
const QualifiedValuesUpdate = ({
  qualifiedValues,
}: {
  qualifiedValues: QualifiedValues;
}) => {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { isLoading, formSchema, methods, onSubmit } = useUpdateQualifiedValues(
    {
      qualifiedValues,
    }
  );

  return (
    <Stack sx={{ bgcolor: "white", borderRadius: 6, p: "28px 26px" }}>
      <Stack direction="row" justifyContent="space-between" mb="1rem">
        <Typography variant="h6" color="primary">
          Edit Qualified Values
        </Typography>
      </Stack>
      <QualifiedValuesForm
        formSchema={formSchema}
        methods={methods}
        onSubmit={onSubmit}
        actionsComponent={
          <Stack
            direction="row"
            sx={{
              justifyContent: "flex-end",
              mt: "5rem",
              columnGap: "1.75rem",
            }}
          >
            <Button
              type="button"
              onClick={() => navigate(-1)}
              sx={{ paddingX: 7, paddingY: 1 }}
              variant="outlined"
            >
              cancel
            </Button>
            <Button
              type="submit"
              sx={{ paddingX: 7, paddingY: 1 }}
              variant="contained"
              disabled={isLoading}
            >
              save
            </Button>
          </Stack>
        }
      />
    </Stack>
  );
};

const _QualifiedValuesUpdate = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { data, isLoading } = useQualifiedValuesService()
    .indexOne()
    .useQuery(Number(id));
  if (isLoading) return <PageLoader />;
  if (data)
    return (
      <QualifiedValuesUpdate qualifiedValues={data?.data?.qualified_value} />
    );

  return null;
};
export default _QualifiedValuesUpdate;
