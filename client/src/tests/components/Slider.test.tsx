import { render, screen, waitFor } from "@testing-library/react";
import { fetchProducts } from "@/utils/recipes";
import { BrowserRouter } from "react-router-dom";
import { Slider } from "@/components";

vi.mock("@/utils/recipes", async() => {
  const { meals } = await import("../mocks/meals")
  return {
    fetchProducts: vi.fn().mockResolvedValueOnce(meals)
                          .mockResolvedValueOnce([])
  }
})

describe("Slider component", () => {
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
  it("renders the slider component and renders the slide data", async () => {
    render(
      <BrowserRouter>
        <Slider
          getSlideData={fetchProducts}
          id="idMeal"
          src="strMealThumb"
          label="strMeal"
          imageId="strMealThumb"
          product={true}
        />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Chicken Karaage")).toBeInTheDocument();
      expect(screen.getByText("Honey Teriyaki")).toBeInTheDocument();
      expect(screen.getByText("Japanese gohan")).toBeInTheDocument();
      expect(screen.getByText("Japanese Katsudon")).toBeInTheDocument();
      expect(screen.getByText("Katsu Chicken")).toBeInTheDocument();
      expect(screen.getByText("Sushi")).toBeInTheDocument();
      expect(screen.getByText("Teriyaki Chicken")).toBeInTheDocument();
      expect(screen.getByText("Tonkatsu pork")).toBeInTheDocument();
      expect(screen.getByText("Yaki Udon")).toBeInTheDocument();
      expect(screen.getByText("Budino Di")).toBeInTheDocument();
      expect(screen.getAllByRole("img").length).toBe(10);
    })
  });

});
