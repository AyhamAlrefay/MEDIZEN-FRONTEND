import { useEffect } from "react";

import HomeIcon from "@mui/icons-material/Home";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { statusCounter } from "../helper/statusCounter";
import { StyledStatusDiv } from "../components/StyledStatusDiv";
import { PagesRoutes } from "@/constants";

function Page404() {
  const navigation = useNavigate();

  useEffect(statusCounter(["4", "0", "4"]), []);

  return (
    <StyledStatusDiv
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zoom: { xs: 0.5, lg: 1 },
        }}
      >
        <div className="clip">
          <div className="shadow-digit">
            <span className="digit firstDigit">0</span>
          </div>
        </div>
        <div className="clip">
          <div className="shadow-digit">
            <span className="digit secondDigit">0</span>
          </div>
        </div>
        <div className="clip">
          <div className="shadow-digit">
            <span className="digit thirdDigit">0</span>
          </div>
        </div>
      </Box>
      <h2>The page you were looking for doesn&apos;t exist.</h2>

      <Button
        startIcon={<HomeIcon />}
        onClick={() => {
          navigation(PagesRoutes.home.path);
        }}
        variant="contained"
        sx={{ mt: 6 }}
      >
        Go to home page
      </Button>
    </StyledStatusDiv>
  );
}

export default Page404;
