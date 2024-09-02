import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from "@/pages"

vi.mock("@/utils/recipes", () => ({
    fetchProducts: vi.fn().mockResolvedValueOnce([
        {
            "idMeal": 1,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg",
            "strMeal": "Chicken Karaage",
            "price": 15.99,
            "fastDelivery": true,
            "ratings": 5,
            "inStock": true,
            "strCategory": "Japanese"
        },
        {
            "idMeal": 2,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
            "strMeal": "Honey Teriyaki Salmon",
            "price": 20.5,
            "fastDelivery": false,
            "ratings": 4,
            "inStock": true,
            "strCategory": "Japanese"
        },
        {
            "idMeal": 3,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/kw92t41604181871.jpg",
            "strMeal": "Japanese gohan rice",
            "price": 8.25,
            "fastDelivery": true,
            "ratings": 3,
            "inStock": true,
            "strCategory": "Japanese"
        },
        {
            "idMeal": 4,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/d8f6qx1604182128.jpg",
            "strMeal": "Japanese Katsudon",
            "price": 12.75,
            "fastDelivery": false,
            "ratings": 4,
            "inStock": true,
            "strCategory": "Japanese"
        },
        {
            "idMeal": 5,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg",
            "strMeal": "Katsu Chicken curry",
            "price": 18,
            "fastDelivery": true,
            "ratings": 5,
            "inStock": true,
            "strCategory": "Japanese"
        },
        {
            "idMeal": 6,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
            "strMeal": "Sushi",
            "price": 25,
            "fastDelivery": true,
            "ratings": 5,
            "inStock": false,
            "strCategory": "Japanese"
        },
        {
            "idMeal": 7,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
            "strMeal": "Teriyaki Chicken Casserole",
            "price": 16.5,
            "fastDelivery": false,
            "ratings": 4,
            "inStock": true,
            "strCategory": "Japanese"
        },
        {
            "idMeal": 8,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/lwsnkl1604181187.jpg",
            "strMeal": "Tonkatsu pork",
            "price": 14,
            "fastDelivery": true,
            "ratings": 4,
            "inStock": true,
            "strCategory": "Japanese"
        },
        {
            "idMeal": 9,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/wrustq1511475474.jpg",
            "strMeal": "Yaki Udon",
            "price": 10.99,
            "fastDelivery": false,
            "ratings": 3,
            "inStock": true,
            "strCategory": "Japanese"
        },
        {
            "idMeal": 10,
            "strMealThumb": "https://www.themealdb.com/images/media/meals/1549542877.jpg",
            "strMeal": "Budino Di Ricotta",
            "price": 12.99,
            "fastDelivery": true,
            "ratings": 5,
            "inStock": true,
            "strCategory": "Italian"
        }
    ])
}))

vi.mock('circletype', () => {
    return {
        default: vi.fn().mockImplementation(() => {
            return {
                radius: vi.fn().mockReturnThis(), 
                dir: vi.fn().mockReturnThis(),
                forceWidth: vi.fn().mockReturnThis(),
                forceHeight: vi.fn().mockReturnThis(),
                refresh: vi.fn().mockReturnThis(),
                destroy: vi.fn(),
            };
        }),
    };
});

describe("Home page component", () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });
    it("renders home page content, get app spinner, and keen slider", async () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        expect(screen.getByText("Get Your Favorite Food With Ease")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /order now/i })).toBeInTheDocument()
        expect(screen.getByRole("link", {"name": /Order Now/i })).toHaveAttribute("href", "/products")
        expect(screen.getByText("Trending Recipes")).toBeInTheDocument()
        expect(screen.getByText("GET THE APP. GET THE APP. GET THE APP.")).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText("Chicken Karaage")).toBeInTheDocument();
            expect(screen.getByText("Honey Teriyaki")).toBeInTheDocument();
            expect(screen.getByText("Japanese gohan")).toBeInTheDocument();
            //slider images and hero image
            expect(screen.getAllByRole("img").length).toBe(11);
        })

    })
})