import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import PrivateRoute from "./components/ProtectedRoute";
import { DocumentsListPage } from "./pages/DocumentsListPage";
import { Mainpage } from "./pages/MainPage";
import DocumentEditorPage from "./pages/DocumentEditorPage/DocumentEditorPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainpage />,
    },
    {
      path: "/documents",
      element: (
        <PrivateRoute>
          <DocumentsListPage />
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
          <DocumentEditorPage />
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
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
