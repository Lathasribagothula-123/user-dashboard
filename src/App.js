import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import UsersPage from "./pages/UsersPage";
import UserForm from "./pages/UserForm";
import UserDetails from "./pages/UserDetails";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UsersPage />} />
          <Route path="add-user" element={<UserForm />} />
          <Route path="edit-user/:id" element={<UserForm />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}