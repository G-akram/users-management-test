import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "../shared/components";
import UserListPage from "../pages/UserListPage";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<UserListPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
