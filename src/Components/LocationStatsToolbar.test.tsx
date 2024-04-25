import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStore } from "redux-mock-store";
import LocationStatsToolbar from "./LocationStatsToolbar";
import { RootState } from "../interfaces";

const mockStore = configureStore<RootState, any>([]);

describe("LocationStatsToolbar Component", () => {
  let store: MockStore<RootState, any>;

  beforeEach(() => {
    store = mockStore({
      users: {
        loading: false,
        users: [
          {
            id: "1",
            name: "User1",
            location: "Location1",
            createdAt: "2024-04-17T20:01:21.099Z",
            creationDate: "2021-10-01",
            avatar: "https://example.com/avatar.jpg",
            hobby: "Painting",
          },
          {
            id: "2",
            name: "User2",
            location: "Location2",
            createdAt: "2024-04-17T20:01:21.099Z",
            creationDate: "2021-10-01",
            avatar: "https://example.com/avatar.jpg",
            hobby: "Painting",
          },
          {
            id: " 3",
            name: "User3",
            location: "Location1",
            createdAt: "2024-04-17T20:01:21.099Z",
            creationDate: "2021-10-01",
            avatar: "https://example.com/avatar.jpg",
            hobby: "Painting",
          },
        ],
        error: "",
      },
    });
  });

  const renderComponent = (newStore?: MockStore) => {
    return render(
      <Provider store={newStore || store}>
        <LocationStatsToolbar />
      </Provider>
    );
  };

  it("renders location stats when users are loaded", () => {
    renderComponent();

    expect(
      screen.getByText("Number of Users per Location:")
    ).toBeInTheDocument();
    expect(screen.getByText("Location1:")).toBeInTheDocument();
    expect(screen.getByText("Location2:")).toBeInTheDocument();
  });

  it("does not render location stats when loading", () => {
    store = mockStore({
      users: {
        loading: true,
        users: [],
        error: "",
      },
    });

    renderComponent(store);

    expect(screen.queryByText("Number of Users per Location:")).toBeNull();
  });

  it("does not render location stats when users are empty", () => {
    store = mockStore({
      users: {
        loading: false,
        users: [],
        error: "",
      },
    });

    renderComponent(store);

    expect(screen.queryByText("Number of Users per Location:")).toBeNull();
  });
});
