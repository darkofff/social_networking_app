import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

import { ThemeProvider } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalOpenContext";
import { NavbarOptionsProvider } from "./contexts/NavbarOptionsContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Search from "./pages/Search";
import Landing from "./pages/Landing";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import News from "./pages/News";
import AppLayout from "./ui/AppLayout";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrepareProfiles from "./features/search/PrepareProfiles";
import DisplayProfiles from "./features/search/DisplayProfiles";
import SearchUserVerification from "./features/search/SearchUserVerification";
import OutOfProfiles from "./features/search/OutOfProfiles";
import Friends from "./pages/Friends";
import Chat from "./features/friends/Chat";
import FriendsList from "./features/friends/FriendsList";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="dark" autoClose={3000} />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <ThemeProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="register" element={<Register />} />
              <Route
                element={
                  <ProtectedRoute>
                    <NavbarOptionsProvider>
                      <ProfileDataProvider>
                        <AppLayout />
                      </ProfileDataProvider>
                    </NavbarOptionsProvider>
                  </ProtectedRoute>
                }
              >
                <Route /* if problems uncomment path="" */ element={<Search />}>
                  {
                    // If thing don't work out go back here
                    /* <Route path="search" element={<DisplayProfiles />} /> */
                  }
                  {/* 
                    path='search' is meant to do initial profile searching and then redirect to 
                    /search:username
                    - It's necessarry so I can use replace on Navigate so user can't go 
                     back to the previous profile 
                  */}
                  <Route path="search" element={<PrepareProfiles />} />
                  <Route path="search/lastSlide" element={<OutOfProfiles />} />
                  <Route
                    path="search/:username"
                    element={<DisplayProfiles />}
                  />
                  <Route
                    path="search/menu"
                    element={<SearchUserVerification />}
                  />
                </Route>
                <Route element={<Friends />}>
                  <Route path="friends" element={<FriendsList />} />
                  <Route path="friends/:username" element={<Chat />} />
                </Route>
                <Route path="news" element={<News />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
