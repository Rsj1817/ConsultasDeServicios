import { useEffect, useState } from "react";

function UserList(){

    const [users, setUsers] = useState([]);

    const getUsers = async () => {

        const response = await fetch('https://fakestoreapi.com/users');
        
        const data = await response.json();
        console.log(data);
        setUsers(data);
    }

    useEffect (()=> {
        getUsers()
    },[])


    return(
        <>
        <h2>UserList</h2>
        {
            users.length == 0 ?
            (<p>Cargando usuarios....</p>)
            :
            (
                users.map((user) => {
                    return(
                        <div key={user.id}>
                            <h3>{user.name.firstname} {user.name.lastname}</h3>
                        </div>
                    )
                }
            ))
        }
        
        </>
    )
}

export default UserList;