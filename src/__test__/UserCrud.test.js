import { render, screen, fireEvent } from "@testing-library/react";
import UserCrud from "../components/UserCrud";

beforeAll(() => {
  window.alert = jest.fn();
});

describe("UserCrud Component Tests", () => {
  test("renders form elements", () => {
    render(<UserCrud />);
    expect(screen.getByPlaceholderText("Enter Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Age")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("displays alert if fields are empty", () => {
    render(<UserCrud />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(window.alert).toHaveBeenCalledWith("Please fill all details");
  });

  test("can submit form and add user to list", () => {
    render(<UserCrud />);

    fireEvent.change(screen.getByPlaceholderText("Enter Name"), {
      target: { value: "Sakthi" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
      target: { value: "sakthi@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Phone"), {
      target: { value: "9999999999" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Age"), {
      target: { value: "25" },
    });

    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByLabelText("Single"));

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Testing user details" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(window.alert).toHaveBeenCalledWith("Form submitted successfully");

    expect(screen.getByText(/Sakthi/i)).toBeInTheDocument();
    expect(screen.getByText(/9999999999/i)).toBeInTheDocument();
  });

  test("edit button loads values back into form", () => {
    render(<UserCrud />);

    // add one user
    fireEvent.change(screen.getByPlaceholderText("Enter Name"), {
      target: { value: "Sakthi" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
      target: { value: "sakthi@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Phone"), {
      target: { value: "9999999999" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Age"), {
      target: { value: "25" },
    });
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByLabelText("Single"));
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "testing" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByPlaceholderText("Enter Name")).toHaveValue("Sakthi");
    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  });

  test("delete removes user from list", () => {
    render(<UserCrud />);

    fireEvent.change(screen.getByPlaceholderText("Enter Name"), {
      target: { value: "DeleteMe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
      target: { value: "del@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Phone"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Age"), {
      target: { value: "30" },
    });
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByLabelText("Single"));
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "to delete" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    fireEvent.click(screen.getByText("Delete"));

    expect(screen.queryByText("DeleteMe")).not.toBeInTheDocument();
  });
});
