import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewSounds() {
    // Updated to match API response property names (snake_case)
    const [sounds, setSounds] = useState({
        name: "",
        artist: "",
        credit: "",
    });

    const { id } = useParams();

    useEffect(() => {
        loadSound();
    }, [id]); // Added id as dependency so it reloads if id changes

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
                        <div className="card-body">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th scope="row">Sound Name</th>
                                        <td>{sounds.name || "Not Available"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Artist</th>
                                        <td>{sounds.artist || "Not Available"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Credit</th>
                                        <td>{sounds.credit || "Not Available"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Link to="/" className="btn custom-primary-button mt-4">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}