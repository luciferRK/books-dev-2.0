// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Routes from "./components/Routes";
import AllContextProvider from "./context/AllContextProvider";
import Header from "./components/Header";
import MobileFooter from "./components/Footer";
import ViewportWatcher from "./components/ViewportWatcher";

function App() {
  return (
    <BrowserRouter>
      <AllContextProvider>
        <ViewportWatcher />
        <Header />
        <Routes />
        <MobileFooter />
      </AllContextProvider>
    </BrowserRouter>
  );
}

export default App;
