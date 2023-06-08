import * as React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Login from "./Login";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function NavBar() {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  return (
    <>
    <Box sx={{ flexGrow: 1}}>
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
          <Typography>
            {currentPage === "/" && (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                onClick={() => setCurrentPage("/login")}
              >
                Login
              </Button>
            )}
          </Typography>
          <Typography>
          {currentPage === "/dashboard" && (
              <Button
                color="inherit"
                component={Link}
                to="/"
                onClick={() => setCurrentPage("/")}
              >
                Logout
              </Button>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
