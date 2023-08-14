import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import trainsApi from "../api";

function TrainsList() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const fetchToken = async () => {};
  //   fetchToken();
  // }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      await trainsApi
        .fetchToken()
        .then(async (token) => {
          await trainsApi
            .fetchAllTrains(token)
            .then((data) => {
              setTrains(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  function filterTrains(trains) {
    const currentTime = new Date();
    console.log(trains);
    const result = trains.filter((data) => {
      const departureTime =
        data.departureTime.Hours * 60 +
        data.departureTime.Minutes +
        data.departureTime.Seconds / 60;
      const delayTime = data.delayedBy;
      const adjustedTime = departureTime + delayTime;
      const timeDifference = adjustedTime - currentTime.getMinutes();
      const minutesDifference = timeDifference;
      console.log(minutesDifference);
      return minutesDifference > 30;
    });
    console.log(result);
    return result;
  }

  function sortTrains(filteredTrains) {
    console.log(filteredTrains);
    return filteredTrains.sort((a, b) => {
      if (a.price.sleeper < b.price.sleeper|| a.price.AC < b.price.AC) {
        return -1;
      }
      if (a.price.sleeper > b.price.sleeper || a.price.AC > b.price.AC) {
        return 1;
      }

      if (
        a.seatsAvailable.sleeper > b.seatsAvailable.sleeper ||
        a.seatsAvailable.AC > b.seatsAvailable.AC
      ) {
        return -1;
      }
      if (
        a.seatsAvailable.sleeper < b.seatsAvailable.sleeper ||
        a.seatsAvailable.AC < b.seatsAvailable.AC
      ) {
        return 1;
      }
      const departureTimeA =
        new Date(a.departureTime).getTime() + a.delayInMinutes * 60 * 1000;
      const departureTimeB =
        new Date(b.departureTime).getTime() + b.delayInMinutes * 60 * 1000;
      if (departureTimeA > departureTimeB) {
        return -1;
      }
      if (departureTimeA < departureTimeB) {
        return 1;
      }
      return 0;
    });
  }

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

  function renderTableHeader() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Train Name</TableCell>
          <TableCell>Train Number</TableCell>
          <TableCell>Departure Time</TableCell>
          <TableCell>Delay (in minutes)</TableCell>
          <TableCell>Sleeper Price</TableCell>
          <TableCell>Sleeper Seats Availability</TableCell>
          <TableCell>AC Price</TableCell>
          <TableCell>AC Seats Availability</TableCell>
          <TableCell>Details</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  function renderTableBody() {
    const filteredTrains = filterTrains(trains);
    console.log(filteredTrains);
    const sortedTrains = sortTrains(filteredTrains);
    return (
      <TableBody>
        {console.log(sortedTrains)}
        {sortedTrains.map((train) => (
          <TableRow key={train.trainNumber}>
            <TableCell>{train.trainName}</TableCell>
            <TableCell>{train.trainNumber}</TableCell>
            <TableCell>
              {formatDateTime(new Date(train.departureTime))}
            </TableCell>
            <TableCell>{train.delayInMinutes}</TableCell>
            <TableCell>{train.price.sleeper}</TableCell>
            <TableCell>{train.seatsAvailable.sleeper}</TableCell>
            <TableCell>{train.price.AC}</TableCell>
            <TableCell>{train.seatsAvailable.AC}</TableCell>
            <TableCell>
              <Link to={`/train/${train.trainNumber}`}>View Details</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <div className="TrainsList">
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Trains Schedule
        </Typography>

        {loading ? (
          <Typography variant="h6" align="center" color="textSecondary">
            Loading data...
          </Typography>
        ) : (
          <Table aria-label="trains table">
            {renderTableHeader()}
            {renderTableBody()}
          </Table>
        )}
      </Container>
    </div>
  );
}

export default TrainsList;
