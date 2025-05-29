import { Box } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
interface DropzoneProps {
  onDropFile: (file: File) => void;
}
function Dropzone({ onDropFile }: DropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onDropFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
    },
    multiple: false, // Allow only one file at a time
  });

  return (
    <div {...getRootProps()}>
      <Box
        sx={{
          border: "1px dashed",
          p: 2,
          borderRadius: "8px",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Box>
    </div>
  );
}
export default Dropzone;
