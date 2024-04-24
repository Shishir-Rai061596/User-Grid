import React from "react";
import UserView from "./features/User/UserView";
import LocationStatsToolbar from "./Components/LocationStatsToolbar";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <UserView />
      <LocationStatsToolbar />
    </div>
  );
};

export default App;
