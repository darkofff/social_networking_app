import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import Profile from "./pages/Profile";
import Contacts from "./pages/Contacts";
import Search from "./pages/Search";
import Landing from "./pages/Landing";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import News from "./pages/News";
import AppLayout from "./ui/AppLayout";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./contexts/ThemeContext";
import Register from "./pages/Register";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="search" element={<Search />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="news" element={<News />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

/* 
COLOR REFFERENCE
*/
