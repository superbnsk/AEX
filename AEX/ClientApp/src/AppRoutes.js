import { Home } from "./components/Home";
import Films from "./components/Films"

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/films',
    element: <Films />
  }
];

export default AppRoutes;
