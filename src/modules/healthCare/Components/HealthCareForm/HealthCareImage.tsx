import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { type Form } from "./validation";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { Box, IconButton } from "@mui/material";
import Dropzone from "@/shared/components/Dropzone/Dropzone";
import HealthCareDefault from "@/assets/healthCare.jpg";
import EditIcon from "@mui/icons-material/Edit";

const HealthCareImage = () => {
  const { watch, setValue } = useFormContext<Form>();
  const avatar = watch("photo");
  const [image, setImage] = useState<any>(avatar);
  const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleDropAvatar = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setValue("photo", file);
    handleCloseDialog();
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('${image || HealthCareDefault}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "8px",
          width: 150,
          height: 150,
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            ":hover": {
              backgroundColor: "whitesmoke",
            },
            position: "absolute",
            bottom: 0,
            right: 0,
            userSelect: "none",
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <StyledDialog
        title={"Chose Health Care Image"}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <Box mt={2}>
          <Dropzone onDropFile={handleDropAvatar} />
        </Box>
      </StyledDialog>
    </>
  );
};

export default HealthCareImage;
