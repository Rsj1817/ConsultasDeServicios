import { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";


function CreateUser(){

    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    })

    const handleCreateUser = async () => {

        if (newUser.name='' || newUser.name === null){
            alert('El nombre es obligatorio');
            return;
        }
        
        if (newUser.email='' || newUser.email === null){
            alert('El email es obligatorio');
            return;
        }

        if (newUser.password='' || newUser.password === null){
            alert('La contraseña es obligatoria');
            return;
        }


        try{
            console.log('Creando usuario...', newUser);
        const response = await fetch('https://fakestoreapi.com/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        console.log('Respuesta del servidor:', response);

        const data = await response.json();
        console.log('Datos del nuevo usuario creado:', data);

        if(!response.ok){
            const error = new Error('Error al crear el usuario');
            error.status = response.status;
            error.statusText = data.message
            throw error;                                       
        
        }

        navigate('/');


        }catch(error){
            console.log('Error al crear el usuario:', error.status, error.statusText        );
            alert(`Error ${error.status}: ${error.statusText}`)         
        }
        

    }


    return(
        <>
            <h2>Crear usuario</h2>
            <p>{JSON.stringify(newUser)}</p>
            <div>
                <CustomInput
                label={"id"}
                type={"number"}
                name={"id"}
                value={newUser.id}
                onChange={
                    (event) => {
                        setNewUser({...newUser, id: event.target.value})
                    }
                }
                />

                <CustomInput
                label={"name"}
                type={"text"}
                name={"name"}
                value={newUser.name}
                onChange={
                    (event) => {
                        setNewUser({...newUser, name: event.target.value})
                    }
                }
                />

                <CustomInput
                label={"email"}
                type={"email"}
                name={"email"}
                value={newUser.email}
                onChange={
                    (event) => {
                        setNewUser({...newUser, email: event.target.value})
                    }
                }
                />

                <CustomInput
                label={"password"}
                type={"password"}
                name={"password"}
                value={newUser.password}
                onChange={
                    (event) => {
                        setNewUser({...newUser, password: event.target.value})
                    }
                }
                />

                <CustomButton action={handleCreateUser}>
                    Crear usuario
                </CustomButton>


            </div>
        
        </>
    )
}

export default CreateUser;