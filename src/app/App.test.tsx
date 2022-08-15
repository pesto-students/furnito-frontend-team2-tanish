import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // our router
import App from "./App";

test("renders learn react link", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
});
