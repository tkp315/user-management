// index.tsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import { Toaster } from "@/components/ui/sonner"


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
    <Toaster closeButton
    className="border-black"
    position="bottom-right"
    theme="light"
    />
      <App/>
    </BrowserRouter>
  </Provider>
);
