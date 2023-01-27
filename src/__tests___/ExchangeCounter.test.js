import { render, screen } from "@testing-library/react";
import ExchangeCounter from "../components/ExchangeCounter";

describe("ExchangeCounter", () => {
  test("should render properly", async () => {
    render(<ExchangeCounter />);
    const header = await screen.findByText("Exchange Counter");
    expect(header).toBeInTheDocument();
  });
});
