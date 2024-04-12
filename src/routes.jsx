import Home from "./pages/Home";
import Guest from "./pages/Guest";
import Booking from "./pages/Booking";
import Resort from "./pages/Resort";
import Room from "./pages/Room";
import Hall from "./pages/Hall";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Guest",
    path: "/guest",
    element: <Guest />,
  },
  {
    name: "Booking",
    path: "/booking",
    element: <Booking />,
  },
  {
    name: "Resort",
    path: "/resort",
    element: <Resort />,
  },
  {
    name: "Room",
    path: "/room",
    element: <Room />,
  },
  {
    name: "Hall",
    path: "/hall",
    element: <Hall />,
  },
];

export default routes;
