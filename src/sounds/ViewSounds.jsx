import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewSounds() {
    const [sounds, setSounds] = useState({
        file_url: "",
        name: "",
        artist: "",
        credit: "",
    });

    const { id } = useParams();

    useEffect(() => {
        loadSound();
    }, []);

    const loadSound = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/sounds/${id}`);
            console.log("API Response:", result.data); // Debugging log
            setSounds(result.data);
        } catch (error) {
            console.error("Error fetching sound details:", error);
        }
    };

    return (
        <div className="custom container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Sound Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of sound id: {id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>file_url:</b> {sounds.file_url || "Not Available"}
                                </li>
                                <li className="list-group-item">
                                    <b>sound name:</b> {sounds.name || "Not Available"}
                                </li>
                                <li className="list-group-item">
                                    <b>Artist:</b> {sounds.artist || "Not Available"}
                                </li>
                                <li className="list-group-item">
                                    <b>Credit:</b> {sounds.credit || "Not Available"}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to="/" className="btn btn-primary mt-4">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}