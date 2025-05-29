/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";

import { useFormContext } from "react-hook-form";

import personImage from "@/assets/person.png";

import { Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { type Form } from "./validation";
import EditImageMenu from "./EditImageMenu";
import { StyledDialog } from "@/shared/components/Dialog/Dialog";
import Dropzone from "@/shared/components/Dropzone/Dropzone";

export const ProfileImageInput = () => {
  const { watch, setValue } = useFormContext<Form>();
  const avatar = watch("avatar");
  const [image, setImage] = useState<any>(avatar);

  const handleDeleteImage = () => {
    setImage(null);
    setValue("avatar", null);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const openEditDialog = () => handleOpen();

  const handleDropAvatar = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setValue("avatar", file);
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('${image || personImage}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "8px",
          width: 150,
          height: 150,
          position: "relative",
        }}
      >
        <EditImageMenu
          handleEdit={openEditDialog}
          handleDelete={handleDeleteImage}
          onClickWhileIsDisabled={() => {
            enqueueSnackbar({
              variant: "warning",
              message: "Choose Customer before upload image",
            });
          }}
        />
      </Box>
      <StyledDialog
        title={"Chose profile avatar"}
        open={open}
        onClose={handleClose}
      >
        <Box mt={2}>
          <Dropzone onDropFile={handleDropAvatar} />
        </Box>
      </StyledDialog>
    </>
  );
};
