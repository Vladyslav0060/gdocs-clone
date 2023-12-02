import TextEditor from "./TextEditor";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import PrivateRoute from "./components/ProtectedRoute";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <div>Main page</div>
        </PrivateRoute>
      ),
    },
    {
      path: "/blank",
      element: (
        <PrivateRoute>
          <Navigate to={`/documents/${uuidv4()}`} />
        </PrivateRoute>
      ),
    },
    {
      path: "/documents/:id",
      element: (
        <PrivateRoute>
          <TextEditor />
        </PrivateRoute>
      ),
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
