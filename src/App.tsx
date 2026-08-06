import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Routes from "./components/Routes";
import Header from "./components/Header";
import MobileFooter from "./components/Footer";
import ViewportWatcher from "./components/ViewportWatcher";
import { initBooks } from "./store/initBooks";

function App() {
  React.useEffect(() => {
    void initBooks();
  }, []);

  return (
    <BrowserRouter>
      <ViewportWatcher />
      <Header />
      <Routes />
      <MobileFooter />
    </BrowserRouter>
  );
}

export default App;
