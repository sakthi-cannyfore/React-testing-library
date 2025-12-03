import reducer, {
  DeleteUser,
  fetchUser,
  addUsers,
} from "../components/redux/features/usersSlice";
import fetchMock from "jest-fetch-mock";
import { configureStore } from "@reduxjs/toolkit";

describe("initiate mocking the store ", () => {
  let store;
  beforeEach(() => {
    fetchMock.resetMocks();
    store = configureStore({ reducer: { users: reducer } });
  });

  it("create the dummy store and", async () => {
    const mockUser = [
      {
        id: 1,
        firstName: "sakthi",
        email: "sakthi@gmail.com",
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify({ users: mockUser }));
    await store.dispatch(fetchUser());

    let state = store.getState().users;
    expect(state.data).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  it("Adding the new user ", async () => {
    const newusers = { id: 2, firstName: "test", email: "test@gmail.com" };

    fetchMock.mockResponseOnce(JSON.stringify(newusers));

    await store.dispatch(addUsers(newusers));
    let state = store.getState().users;
    expect(state.data).toContainEqual(newusers);
  });
  it("test case for the deleting function", async () => {
    store = configureStore({
      reducer: { users: reducer },
      preloadedState: {
        users: {
          data: [{ id: 1, firstName: "anonymose" }],
          loading: false,
          error: "",
        },
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify({}));

    await store.dispatch(DeleteUser(1));
    const state = store.getState().users;
    expect(state.data).toEqual([]);
  });
});
