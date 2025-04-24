import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../auth/AuthService';
import { API_BASE_URL } from '../api';
export default function ViewSounds() {
    // Updated to match API response property names (removed description)
    const [sound, setSound] = useState({
        name: "",
        artist: "",
        credit: "",
        fileUrl: ""
    });
    const [loading, setLoading] = useState(true);
    const isAuthenticated = AuthService.isAuthenticated();
    const { id } = useParams();
    // Ensure useParams is used to get the sound ID from the URL
    useEffect(() => {
        loadSound();
    }, [id]); // Added id as dependency so it reloads if id changes
    // Function to load sound details from the API
    const loadSound = async () => {
        try {
            // Include auth headers if authenticated
            const config = isAuthenticated ? { headers: AuthService.getAuthHeader() } : {};
            const result = await axios.get(`${API_BASE_URL}/api/sounds/${id}`, config);
            console.log("API Response:", result.data); // Debugging log
            setSound(result.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching sound details:", error);
            setLoading(false);
        }
    };
    // Ensure the component is styled correctly
    if (loading) {
        return (
            <div className="custom container-fluid mt-5 pt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading sound details...</p>
                </div>
            </div>
        );
    }
    // Check if sound details are available
    if (!sound.name) {
        return (
            <div className="custom container-fluid mt-5 pt-5">
                <div className="alert alert-warning text-center" role="alert">
                    Sound not found or unable to load details.
                </div>
                <div className="text-center mt-3">
                    <Link to="/" className="btn custom-primary-button">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }
    // Render sound details if available
    return (
        <div className="custom container-fluid mt-5 pt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Sound Details</h2>

                    {/* Audio Player */}
                    <div className="mb-4 text-center">
                        <audio controls className="w-100 mb-3">
                            <source src={sound.fileUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th scope="row">Sound Name</th>
                                        <td>{sound.name || "Not Available"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Artist</th>
                                        <td>{sound.artist || "Not Available"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Credit</th>
                                        <td>{sound.credit || "Not Available"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link to="/" className="btn custom-primary-button mt-4">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}