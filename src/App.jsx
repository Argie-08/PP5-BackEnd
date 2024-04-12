import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          );
        })}
      </Routes>
    </>
  );
};

export default App;
