import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Typography, Paper, Grid, Button } from "@material-ui/core";
import trainsApi from "../api";

function TrainDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    trainsApi
      .fetchToken()
      .then((token) => {
        setToken(token);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  useEffect(() => {
    if (id && token) {
      trainsApi
        .fetchParticularTrain(id, token)
        .then((train) => {
          setTrain(train);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
          <Paper elevation={3}>
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
                  {formatDateTime(new Date(train.departureTime))}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Delay (in minutes): {train.delayInMinutes}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Sleeper Price: {train.sleeper.price}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Sleeper Seats Availability: {train.sleeper.seatsAvailability}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  AC Price: {train.ac.price}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  AC Seats Availability: {train.ac.seatsAvailability}
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
