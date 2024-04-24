import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USERLIST_FETCH_REQUEST } from "./UserActions";
import { RootState } from "../../interfaces";
import LoaderIcon from "../../Components/LoaderIcon";
import { USERLIST_DELETE, USERLIST_LOCATION_UPDATE } from "./UserSlice";
import { LOCATIONS } from "../../constants";

const UserView = () => {
  const {
    loading,
    users: usersList,
    error,
  } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: USERLIST_FETCH_REQUEST });
  }, [dispatch]);

  const handleDeleteUser = (id: string) => {
    dispatch(USERLIST_DELETE(id));
  };

  const handleLocationChange = (id: string, newLocation: string) => {
    dispatch(USERLIST_LOCATION_UPDATE({ id, newLocation }));
  };

  return (
    <div className="user-table">
      {loading ? (
        <div className="loader-container">
          <LoaderIcon />
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      ) : usersList.length ? (
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Hobby</th>
                <th>Creation Date</th>
                <th>Location</th>
                <th>Action</th>
                <th>remove</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.hobby}</td>
                  <td>{user.creationDate}</td>
                  <td>
                    <select
                      value={user.location}
                      onChange={e =>
                        handleLocationChange(user.id, e.target.value)
                      }
                    >
                      {LOCATIONS.map(location => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                  <td>{user.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserView;
