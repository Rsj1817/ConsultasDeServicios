import { Routes, Route } from "react-router-dom"
import UserDetail from "./pages/UserDetail"
import CreateUser from "./pages/CreateUser"
import UserList from "./pages/UserList"


function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<UserList/>}/>
        <Route path='/createUsers' element={<CreateUser/>}/>
        <Route path='/userDetails' element={<UserDetail/>}/>
    

                      

      </Routes>

    </>
  )
}

export default App
