import { Box, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { ContextProps } from "../utils/props";

export const ReturnPage = () => {
	const { loggedIn }: ContextProps = useOutletContext();
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
      {loggedIn ? 
      <Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					bgcolor: "#090909",
					borderRadius: "0.5rem",
					p: "2rem",
				}}
      >	
				
			</Box>
			:
			<Typography>You are not logged in.</Typography>
		}
	</Box>
	);
}
