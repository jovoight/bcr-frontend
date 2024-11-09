import { Box, Typography } from "@mui/material";

export const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "83vh",
      }}
    >
      <Typography>
        An unexpected error has occurred. Please refresh the page and try again.
      </Typography>
    </Box>
  );
};
