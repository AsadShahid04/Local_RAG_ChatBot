import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
    </Routes>
  );
};
