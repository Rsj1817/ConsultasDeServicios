import { Routes, Route } from "react-router-dom"
import UserDetail from "./pages/UserDetail"
import CreateUser from "./pages/CreateUser"
import UserList from "./pages/UserList"
import CustomButton from "./components/CustomButton"
import { useNavigate } from "react-router-dom"


function App() {

  const navigate = useNavigate();

  return (
    <>
      <CustomButton action={()=>{navigate('/')}}>
        Listar usuarios
      </CustomButton>
      <CustomButton action={() => navigate('/createUser')}>
        Crear usuario
      </CustomButton>
      <Routes>
        <Route path='/' element={<UserList/>}/>
        <Route path='/createUser' element={<CreateUser/>}/>
        <Route path='/userDetails' element={<UserDetail/>}/>
    
      </Routes>

    </>
  )
}

export default App
