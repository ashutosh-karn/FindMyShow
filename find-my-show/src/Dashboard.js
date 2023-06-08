import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function parseHtmlString(htmlString) {
  return { __html: htmlString };
}

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${searchQuery}`
      );
      const data = response.data;
      if (data && data.length === 0) {
        setSnackbarOpen(true);
        setSnackbarMessage("No results found.");
      }

      setShows(data);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button type="submit" onClick={handleSearch} variant="outlined">
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {shows.map((show) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={show.show.id}>
            <Card sx={{ height: "500px" , overflowY: "scroll"}}>
              <CardMedia
                component="img"
                height="100%"
                image={show.show.image?.medium || ""}
                alt={show.show.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {show.show.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <div
                    dangerouslySetInnerHTML={parseHtmlString(show.show.summary)}
                  />
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Type: {show.show.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Language: {show.show.language}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genres: {show.show.genres?.join(", ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {show.show.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schedule: {show.show.schedule?.days?.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="warning">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Dashboard;

