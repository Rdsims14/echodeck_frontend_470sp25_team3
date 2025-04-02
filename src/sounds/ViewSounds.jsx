import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from '../api';


export default function ViewSounds() {
    const [user, setSounds] = useState({
        Title: "",
        File: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadSound();
    }, [id]); // Include `id` in the dependency array

    const loadSound = async () => {
        try {
            const result = await axios.get(`${API_BASE_URL}/sounds/${id}`);

            setSound(result.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <div className="custom-container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">User Details</h2> {/* Fixed heading */}

                    <div className="card">
                        <div className="card-header">
                            <b>Details of Sound ID: {id}</b>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Title: </b>
                                {user.name}
                            </li>
                            <li className="list-group-item">
                                <b>File: </b>
                                {user.email}
                            </li>
                        </ul>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
