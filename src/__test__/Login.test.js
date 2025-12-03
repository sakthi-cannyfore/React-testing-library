import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../components/Login";

test("checking component Loaded", () => {
  render(<Login />);
  expect(screen.queryByText(/Login/i)).toBeInTheDocument();
});

test("initiate the forms input values", () => {
  render(<Login />);
  expect(screen.getByPlaceholderText("UserName")).toHaveValue("");
  expect(screen.getByPlaceholderText("Enter Email")).toHaveValue("");
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

test("shows invalid message for wrong credentials", async () => {
  render(<Login />);

  fireEvent.change(screen.getByPlaceholderText("UserName"), {
    target: { value: "wrong" },
  });

  fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
    target: { value: "wrong@gmail.com" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(
    () => expect(screen.getByText("Invalid creditial")).toBeInTheDocument(),
    { timeout: 3500 }
  );
});

test("shows success message on corect credentials", async () => {
  render(<Login />);

  fireEvent.change(screen.getByPlaceholderText("UserName"), {
    target: { value: "sakthi" },
  });

  fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
    target: { value: "sakthi@gmail.com" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(
    () =>
      expect(screen.getByText("Successfully Logged in")).toBeInTheDocument(),
    {
      timeout: 3500,
    }
  );
});
