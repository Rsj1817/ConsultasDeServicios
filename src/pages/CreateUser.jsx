import { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";


function CreateUser(){

    const [newUser, setNewUser] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    })

    const handleCreateUser = async () => {
        console.log('Creando usuario...', newUser);
        fetch('https://fakestoreapi.com/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(json => console.log(json))
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