import { Routes, Route } from "react-router-dom";

import { ErrorBoundary } from "./components/ErrorBoundary";
import UserListPage from "./pages/UserListPage";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<UserListPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
