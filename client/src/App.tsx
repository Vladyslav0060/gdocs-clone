import TextEditor from "./TextEditor";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={`/documents/${uuidv4()}`} />,
    },
    {
      path: "/documents/:id",
      element: <TextEditor />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
