import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"

import Layout from "./components/header-footer/Layout"
import ProviderWrapper from "./context/ProviderWrapper"

import Home from "./pages/Home"
import Games from "./pages/Games"
import Records from "./pages/Records"
import Login, {action as actionLogin} from "./pages/Login"
import CreateAccount, {action as actionCreateUser} from "./pages/CreateAccount"
import LogOut from "./pages/LogOut"

import Tenzies from "./games/tenzies/tenzies"
import Phantom from "./games/phantom/Phantom"
import MindPairs from "./games/mindPairs/MindPairs"
import Battleship from "./games/battleship/Battleship"
import Sudoku from "./games/sudoku/Sudoku"


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="games" element={<Games />} />
      <Route path="games/tenzies" element={<Tenzies />} />
      <Route path="games/phantom-phrase" element={<Phantom />}/>
      <Route path="games/mind-pairs" element={<MindPairs />}/>
      <Route path="games/battleship"  element={<Battleship />}/>
      <Route path="games/sudoku" element={<Sudoku />} />
      <Route path="records" element={<Records />} />
      <Route path="login" element={<Login />} action={actionLogin} />
      <Route path="createAccount" element={<CreateAccount />} action={actionCreateUser} />
      <Route path="logOut" element={<LogOut />}/>
    </Route>
  ))
 

  return (
    <ProviderWrapper>
      <div className="flex flex-col min-h-screen">
        <RouterProvider router={router}/>
      </div>
    </ProviderWrapper>   
  )
}

export default App
