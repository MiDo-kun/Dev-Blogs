import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import { CookiesProvider } from "react-cookie";
import DeletePost from './pages/DeletePost';
import Logout from './pages/LogoutPage';

function App() {
  return (
    <CookiesProvider>
      <UserContextProvider>
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
          </Route>
        </Routes>
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default App;