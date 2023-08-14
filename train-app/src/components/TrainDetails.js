import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Typography, Paper, Grid, Button } from "@material-ui/core";
import trainsApi from "../api";
import "./TrainDetails.css";

function TrainDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  //   const [token, setToken] = useState("");

  //   useEffect(() => {}, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await trainsApi
          .fetchToken()
          .then(async (token) => {
            await trainsApi
              .fetchParticularTrain(id, token)
              .then((data) => {
                setTrain(data);
                setLoading(false);
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };
    fetchData();
  }, [id]);

  function formatDateTime(date) {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-IN", options);
  }

  function handleBack() {
    history.goBack();
  }

  return (
    <div className="TrainDetails">
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Train Details
        </Typography>

        {loading ? (
          <Typography variant="h6" align="center" color="textSecondary">
            Loading data...
          </Typography>
        ) : (
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              margin: "20px",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Train Name: {train.trainName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Train Number: {train.trainNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Departure Time:{" "}
                  {train.departureTime.Hours +
                    ":" +
                    train.departureTime.Minutes +
                    ":" +
                    train.departureTime.Seconds}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Delay (in minutes): {train.delayedBy}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Sleeper Price: {train.price.sleeper}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Sleeper Seats Availability: {train.seatsAvailable.sleeper}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  AC Price: {train.price.AC}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  AC Seats Availability: {train.seatsAvailable.AC}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default TrainDetails;
