import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import cartReducer from "@/features/cartSlice"
import customerReducer from "@/features/customerSlice"
import { Navigation } from "@/components";
import "@testing-library/jest-dom/vitest"

const defaultCart: CartState = {
    items: [],
    orderCreated: false
}


const defaultCustomer: CustomerState = {
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


// Test Case 1: State Management
describe('Navigation Component', () => {
   

    // Test Case 2: Link Routing
    it('should navigate to the Home page when clicking the Home link', () => {
        const store = configureStore({
            reducer: {
                cart: cartReducer,
                customer: customerReducer
            },
            preloadedState: {
                cart: defaultCart,
                customer: defaultCustomer
            }
        })
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navigation />
                </MemoryRouter>
            </Provider>
        );


        // Simulate clicking the Home link
        fireEvent.click(screen.getByLabelText('home-link-desktop'));
        expect(window.location.pathname).toBe("/");
    });

    it('should render all the navigation links and components', () => {
        const store = configureStore({
            reducer: {
                cart: cartReducer,
                customer: customerReducer
            },
            preloadedState: {
                cart: defaultCart,
                customer: defaultCustomer
            }
        })
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navigation />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByLabelText('home-link-desktop')).toBeInTheDocument();
        expect(screen.getByLabelText('products-link-desktop')).toBeInTheDocument();
        expect(screen.getByLabelText('searchbar-container-desktop')).toBeInTheDocument();
        expect(screen.getByLabelText('get-the-app-link-desktop')).toBeInTheDocument();
        expect(screen.getByLabelText('cart-container')).toBeInTheDocument();
        expect(screen.getByLabelText('account-container')).toBeInTheDocument();

        // Check for components like Searchbar

        const searchIcon = screen.getByLabelText('search-icon');
        fireEvent.click(searchIcon);
        expect(screen.getByPlaceholderText("Search for recipes...")).toBeInTheDocument()

    });

    it('should have correct aria attributes on the mobile menu toggle button', () => {


        const store = configureStore({
            reducer: {
                cart: cartReducer,
                customer: customerReducer
            },
            preloadedState: {
                cart: defaultCart,
                customer: defaultCustomer
            }
        })
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navigation />
                </MemoryRouter>
            </Provider>
        );


        window.innerWidth = 500
        fireEvent(window, new Event('resize'))

        const toggleButton = screen.getByLabelText('menu-toggle-button')
        expect(toggleButton).toHaveAttribute('aria-controls', 'navbar-hamburger');
    });

    it('should toggle mobile menu visibility when the button is clicked', () => {

        const store = configureStore({
            reducer: {
                cart: cartReducer,
                customer: customerReducer
            },
            preloadedState: {
                cart: defaultCart,
                customer: defaultCustomer
            }
        })
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navigation />
                </MemoryRouter>
            </Provider>
        );

        window.innerWidth = 500

        fireEvent(window, new Event('resize'))

        const toggleButton = screen.getByLabelText('menu-toggle-button')
        const mobileMenu = screen.getByLabelText("navbar-hamburger")
        expect(mobileMenu).toHaveClass("hidden")

        // Click to open the menu
        fireEvent.click(toggleButton);
        expect(mobileMenu).toHaveClass("block")

        expect(screen.getByLabelText('menu-toggle-button')).toBeInTheDocument()
        expect(screen.getByLabelText('navbar-hamburger')).toBeInTheDocument();
        expect(screen.getByLabelText('nav-home-link')).toBeInTheDocument();
        expect(screen.getByLabelText('nav-products-link')).toBeInTheDocument();
        expect(screen.getByLabelText('nav-cart-link')).toBeInTheDocument();
    });
});
