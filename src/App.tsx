import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext, Suspense, useEffect } from "react";
import allLazy from "./Routers/lazy";
import Navbar from "./Components/Navbar";
import Loading from "./Components/Loding";
const { Search, Anime, ViewAnime,Home } = allLazy;
import Footer from "./Components/Footer";
import "./App.css";



interface QueryContextType {
  query: string;
  setQuery: (query: string) => void;
  theme: string
  setTheme: (theme: string) => void;
}

const defaultValue: QueryContextType = {
  query: "",
  theme: "dark",
  setQuery: function () {},
  setTheme: function () {},
};

export const QueryContext = createContext<QueryContextType>(defaultValue);

function App() {
  const [query, setQuery] = useState("");

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  });
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loading />}>
        <QueryContext.Provider value={{ query, setQuery, setTheme, theme }}>
          <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/anime/:id" element={<Anime/>}></Route>
              <Route
                path="/anime/:id/:name/:caps/play"
                element={<ViewAnime />}
              ></Route>
              <Route
                path="/search"
                element={<Search url="" text="Tus Resultados"></Search>}
              ></Route>
            </Routes>
            <div className="mt-auto">
              <Footer />
            </div>
          </BrowserRouter>
        </QueryContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
