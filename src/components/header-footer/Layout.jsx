import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout(){
    const location = useLocation()

    const backgroundMapping = {
      "/" : "bg-orange-50",
      "/games/tenzies" : "bg-gradient-to-br from-orange-300 to-orange-200",
      "/games/phantom-phrase" : "bg-gradient-to-br from-indigo-300 to-indigo-200",
      "/games/mind-pairs" : "bg-gradient-to-br from-green-300 to-green-200",
      "/games/battleship" : "bg-gradient-to-br from-indigo-300 to-indigo-200",
      "/games/sudoku" : "bg-gradient-to-br from-lime-300 to-lime-200"
    }

    const backgroundClass = backgroundMapping[location.pathname] || ""

    return(
        <>
          <Header />
          <main className={`flex-1 flex flex-col ${backgroundClass} `}>
            <Outlet />
          </main>
          <Footer />
        </>
    )
}