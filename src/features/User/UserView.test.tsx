import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStore } from "redux-mock-store";
import UserView from "./UserView";
import { RootState } from "../../interfaces";

const mockStore = configureStore<RootState, any>([]);

describe("UserView Component", () => {
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
        <UserView />
      </Provider>
    );
  };

  it("renders user table when users are loaded", () => {
    renderComponent();

    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByText("User2")).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    store = mockStore({
      users: {
        loading: false,
        users: [],
        error: "Failed to fetch users",
      },
    });

    renderComponent(store);

    expect(
      screen.getByText("Error: Failed to fetch users")
    ).toBeInTheDocument();
  });

  it("renders 'No users found' message when users list is empty", () => {
    store = mockStore({
      users: {
        loading: false,
        users: [],
        error: "",
      },
    });

    renderComponent(store);

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });
});
