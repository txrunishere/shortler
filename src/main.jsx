import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./app/providers";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
