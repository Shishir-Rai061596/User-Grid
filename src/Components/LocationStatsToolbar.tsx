import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../interfaces";

const LocationStatsToolbar: React.FC = () => {
  const { loading, users } = useSelector((state: RootState) => state.users);

  const locationStats = users.reduce((stats, user) => {
    stats[user.location] = (stats[user.location] || 0) + 1;
    return stats;
  }, {} as { [key: string]: number });

  return !loading && users.length > 0 ? (
    <div className="location-stats-toolbar">
      <h3>Number of Users per Location:</h3>
      <ul>
        {Object.entries(locationStats).map(([location, count]) => (
          <li key={location}>
            <span className="location-name">{location}:</span> {count}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default LocationStatsToolbar;
