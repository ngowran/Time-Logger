import logo from "./assets/logo.png";
import "./App.css";
import icon from "./assets/favicon.ico";
import { useEffect } from "react";
import Addtime from "./components/Addtime";
import Tables2 from "./components/Tables2";
import ResponsiveAppBar from "./components/Appbar";
import { AuthProvider } from "./hocs/Auth";

function App() {
  useEffect(() => {
    const favicon = document.getElementById("favicon");
    favicon.setAttribute("href", icon);
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <ResponsiveAppBar />
        <header className="items-center justify-center content-center">
          <div>
            <h1 className="text-3xl text-stone-800 tracking-wider py-20">
              <span className="tracking-tight">
                Welcome To <br />{" "}
              </span>
              <span className="font-semibold">
                <span className="text-yellow-300">Enactus</span>
                <span className="text-[#4169E1]"> DCU</span>
              </span>{" "}
              Time Logger!
            </h1>
          </div>
        </header>
        <Addtime />
        <Tables2 />
      </AuthProvider>
    </div>
  );
}

export default App;
