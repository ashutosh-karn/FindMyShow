import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Login from "./Login";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                ></IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link
                    to="/"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </Typography>

                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
        <Routes>
          <Route exactpath="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
