import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    BrowserRouter,
    Route,
    Switch,
    Link,
    useHistory
} from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        //chiamata axios

        getUsers();
    }, []);

    const getUsers = () => {
        if (users.length < 1) {
            axios.get("./api/users").then(res => {
                // console.log(res);
                var us = res.data;
                setUsers(us);
                // console.log("🚀setUsers", us);
            });
        }
    };

    const deleteUserHandler = id => {
        // console.log(id);
        axios
            .delete(`http://localhost:8000/api/users/delete/${id}`)
            .then(res => console.log("response", res));
        const newList = users.filter(us => us.id !== id);
        setUsers(newList);
    };

    var utenti = null;
    if (users.length > 0) {
        utenti = (
            <div>
                {users.map(user => {
                    return (
                        <div
                            className="card mb-2 col-6 bg-light text-center mx-auto"
                            key={user.id}
                        >
                            <div className="card-body" key={user.id}>
                                <Link to={`users/show/${user.id}`}>
                                    <h3>{user.name}</h3>
                                    <h3>{user.email}</h3>
                                </Link>
                                <Link
                                    to={`users/edit/${user.id}`}
                                    className="btn btn-primary mr-2"
                                >
                                    EDIT
                                </Link>
                                <button
                                    onClick={() => deleteUserHandler(user.id)}
                                    className="btn btn-danger"
                                >
                                    DELETE
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="mt-3 col-sm-12  text-center">
            <h1>Users</h1>
            <Link className="btn btn-success mt-2 mb-4" to="/users/create">
                Create New User
            </Link>
            <Link
                className="btn btn-warning ml-3 mt-2 mb-4"
                to="/users/restore"
            >
                Restore User
            </Link>
            {utenti}
        </div>
    );
}

export default Users;
