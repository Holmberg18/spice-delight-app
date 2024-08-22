import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "@/features/customerSlice"
import LoginForm from "@/components/LoginForm";
import "@testing-library/jest-dom/vitest";

const initialState: CustomerState = {
    customer: {
    customerId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    username: ""
}
}

const defaultStore = configureStore({
    reducer: {
        customer: customerReducer
    },
    preloadedState: {
        customer: initialState
    },
})

describe("LoginForm Component", () => {
  it("renders the login form", () => {

    render(
      <Provider store={defaultStore}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect( screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("shows validation errors if fields are empty on submit", async () => {

    const store = configureStore({
        reducer: {
            customer: customerReducer
        },
        preloadedState: {
            customer: initialState
        },
    })

    render(
      <Provider store={defaultStore}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click( screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is a required field/i)).toBeInTheDocument();
      expect(screen.getByText(/password is a required field/i)).toBeInTheDocument();
    });
  });

  it("displays error message on failed login attempt", async () => {

    render(
      <Provider store={defaultStore}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "invalidUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "invalidPass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText("Login Failed: Invalid Username or Password")).toBeInTheDocument();
    });
  });



  it("shows loading spinner during form submission", async () => {

    render(
      <Provider store={defaultStore}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "stevie.five" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "soFetch012490!" },
    });
    fireEvent.click(screen.getByRole("button"));

    const button = screen.getByRole("button", { name: /Login/i })

    await waitFor(() => {
        expect(button.hasAttribute("disabled")).toBe(true);
      });
  });
});
