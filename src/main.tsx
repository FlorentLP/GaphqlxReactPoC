import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import pokemonClient from "./pokemonClient.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={pokemonClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <App></App>
      </Suspense>
    </ApolloProvider>
  </StrictMode>,
);
