import reducer, {
  fetchUser,
  addUsers,
  DeleteUser,
} from "../components/redux/features/usersSlice";
import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "jest-fetch-mock";

describe("Users Slice Test Cases", () => {
  let store;

  beforeEach(() => {
    fetchMock.resetMocks();
    store = configureStore({ reducer: { users: reducer } });
  });

  test("should update state after successful fetch users", async () => {
    const mockUsers = [
      { id: 1, firstName: "Sakthi", email: "sakthi@test.com" },
    ];

    fetchMock.mockResponseOnce(JSON.stringify({ users: mockUsers }));

    await store.dispatch(fetchUser());

    const state = store.getState().users;
    expect(state.data).toEqual(mockUsers);
    expect(state.loading).toBe(false);
  });

  test("should add user on addUsers fulfilled", async () => {
    const newUser = { id: 2, firstName: "Arun", email: "arun@test.com" };

    fetchMock.mockResponseOnce(JSON.stringify(newUser));

    await store.dispatch(addUsers(newUser));
    const state = store.getState().users;

    expect(state.data).toContainEqual(newUser);
  });

  test("should delete user on DeleteUser fulfilled", async () => {
    store = configureStore({
      reducer: { users: reducer },
      preloadedState: {
        users: {
          data: [{ id: 1, firstName: "Test" }],
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
