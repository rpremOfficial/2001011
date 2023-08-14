import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import TrainsList from "./components/TrainsList.js";
import TrainDetails from "./components/TrainDetails.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <TrainsList />
          </Route>
          <Route path="/train/:id">
            <TrainDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
