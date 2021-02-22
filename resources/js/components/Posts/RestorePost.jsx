import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function RestorePost() {
    const history = useHistory();
    const [restorePost, setRestorePost] = useState({
        title: "",
        user_id: ""
    });

    const handleChange = e => {
        const name = e.target.name;

        const value = e.target.value;

        setRestorePost({ ...restorePost, [name]: value });
    };

    const restoreHandler = e => {
        e.preventDefault();
        console.log("restore");
        console.log(restorePost);
        axios
            .post("http://localhost:8000/api/posts/restore", restorePost)
            .then(res => console.log(res));
        history.push(`/posts`);
    };

    return (
        <div className="card col-sm-6 mx-auto text-center mt-5">
            <h2 className="card-title">Restore Post</h2>

            <form className="col-sm-6 mx-auto" onSubmit={restoreHandler}>
                <div className="form-group text-center">
                    <label htmlFor="title">Title:</label>
                    <input
                        value={restorePost.title}
                        onChange={handleChange}
                        placeholder="Insert Name"
                        type="text"
                        name="title"
                        className="form-control"
                    />

                    <label htmlFor="user_id">User id:</label>
                    <input
                        value={restorePost.user_id}
                        onChange={handleChange}
                        placeholder="Insert email"
                        type="text"
                        name="user_id"
                        className="form-control"
                    />

                    <input
                        type="submit"
                        value="Restore"
                        className="btn btn-success mt-2"
                    />
                </div>
            </form>
        </div>
    );
}

export default RestorePost;
