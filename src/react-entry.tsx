import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/ui/curved-menu";

const container = document.getElementById("react-header");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Header />
    </React.StrictMode>
  );
}
