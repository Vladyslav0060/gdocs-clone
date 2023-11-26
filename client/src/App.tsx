import TextEditor from "./TextEditor";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ProtectedRouteWrapper } from "./components";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={`/documents/${uuidv4()}`} />,
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
      path: "/test",
      element: (
        <ProtectedRouteWrapper>
          <div>Main page</div>
        </ProtectedRouteWrapper>
      ),
    },
    {
      path: "/documents/:id",
      element: <TextEditor />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
