import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ContextProps } from "../utils/props";
import {  FormEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getUser } from "../utils/api";

export const LoginPage = () => {
  const { loggedIn, setLoggedIn, setUser }: ContextProps = useOutletContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getUser(username, password)
      .then(res => {
        setError('');
        setUser(res);
        setLoggedIn(true);
        navigate('/admin');
      })
      .catch(() => {
        setError('Username or password is incorrect.');
      });
  }
  return (
    <Box
      sx={{
        minHeight: "83vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loggedIn ? (
        <Typography>You are already logged in.</Typography>
      ) : (
        <>
          <Box
            component="form"
            sx={{
              bgcolor: "#090909",
              p: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "0.5rem",
              minWidth: "25rem",
            }}
            onSubmit={handleSubmit}
          >
            <Typography variant="h4">Login</Typography>
            <TextField
              variant="filled"
              label="Username"
              margin="dense"
              fullWidth
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant="filled"
              type={showPassword ? "text" : "password"}
              label="Password"
              margin="dense"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                m: "0.5rem",
                width: "6rem",
              }}
            >Sign In</Button>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </>
      )}
    </Box>
  );
};
