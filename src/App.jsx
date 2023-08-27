import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import DeletePost from './pages/DeletePost';
import Logout from './pages/LogoutPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./config/queryClient";
import Success from "./sections/Success";
import { HelmetProvider } from 'react-helmet-async';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/delete/:id" element={<DeletePost />} />
            <Route path="/success" element={<Success />} />
          </Route>
        </Routes>
      </HelmetProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;