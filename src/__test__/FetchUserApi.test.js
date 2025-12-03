import { render, screen, waitFor } from "@testing-library/react";
import FetchUsersApi from "../components/FetchUsersApi";

describe("initiate the component render ", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "sakthi", email: "sakthi@gmail.com" },
          ]),
      })
    );
  });

  it("render the component test ", async () => {
    render(<FetchUsersApi />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(await screen.findByText("sakthi")).toBeInTheDocument();
    expect(await screen.findByText("sakthi@gmail.com")).toBeInTheDocument();
  });
});
