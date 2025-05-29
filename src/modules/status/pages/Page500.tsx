import { useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button } from "@mui/material";

import { statusCounter } from "../helper/statusCounter";
import { StyledStatusDiv } from "../components/StyledStatusDiv";

function Page500() {
  useEffect(statusCounter(["0", "0", "5"]), []);

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
      <Box sx={{ position: "relative", zoom: { xs: 0.5, lg: 1 } }}>
        <div className="clip">
          <div className="shadow-digit">
            <span className="digit firstDigit ">0</span>
          </div>
        </div>
        <div className="clip">
          <div className="shadow-digit">
            <span className="digit secondDigit">0</span>
          </div>
        </div>
        <div className="clip">
          <div className="shadow-digit">
            <span className="digit thirdDigit ">0</span>
          </div>
        </div>
      </Box>
      <h2>There was an error, please try again later</h2>
      <h2>
        The server encountered an internal error and was not able to complete
        your request
      </h2>

      <Button
        startIcon={<RefreshIcon />}
        onClick={() => {
          window.location.reload();
        }}
        variant="contained"
        sx={{ mt: 6 }}
      >
        Try again
      </Button>
    </StyledStatusDiv>
  );
}

export default Page500;
