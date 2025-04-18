import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthService from '../auth/AuthService';
import "../styles/UploadSounds.css";

export default function UploadSounds() {
    const [sound, setSound] = useState({
        name: "",
        file: null,
        artist: "",
        credit: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    let navigate = useNavigate();

    const onInputChange = (e) => {
        setSound({ ...sound, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        setSound({ ...sound, file: e.target.files[0] });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!sound.file) {
            setMessage('❌ Please select a sound file');
            return;
        }

        setLoading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("name", sound.name);
        formData.append("file", sound.file);
        formData.append("artist", sound.artist);
        formData.append("credit", sound.credit);

        try {
            // Include auth headers for protected endpoint
            const config = {
                headers: {
                    ...AuthService.getAuthHeader(),
                    "Content-Type": "multipart/form-data",
                }
            };

            await axios.post("http://localhost:8080/api/sounds", formData, config);
            setMessage("✅ Sound uploaded successfully!");
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            console.error("Error uploading sound:", error);
            setMessage("❌ Failed to upload sound. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="custom-container mt-5 pt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center mb-4">Upload New Sound</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter sound title"
                                name="name"
                                value={sound.name}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">File</label>
                            <input
                                type="file"
                                className="form-control"
                                name="file"
                                accept="audio/*"
                                onChange={onFileChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="artist" className="form-label">Artist</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter artist name"
                                name="artist"
                                value={sound.artist}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="credit" className="form-label">Credit</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter credit"
                                name="credit"
                                value={sound.credit}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button
                                type="submit"
                                className="btn custom-primary-button w-50 me-2"
                                disabled={loading}
                            >
                                {loading ? "Uploading..." : "Submit"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary w-50"
                                onClick={() => navigate("/")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                    {message && (
                        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} mt-3`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}