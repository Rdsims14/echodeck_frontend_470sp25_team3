import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadSounds() {
    const [sound, setSound] = useState({
        name: "",
        file: null,
        artist: "",
        credit: "",
    });

    let navigate = useNavigate();

    const onInputChange = (e) => {
        setSound({ ...sound, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        setSound({ ...sound, file: e.target.files[0] });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", sound.name);
        formData.append("file", sound.file);
    
        try {
            await axios.post("http://localhost:8080/api/sounds", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/");
        } catch (error) {
            console.error("Error uploading sound:", error);
            alert("Failed to upload the sound. Please try again.");
        }
    };

    return (
        <div className="custom-container">
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
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <button
                            type="button"
                            className="btn btn-outline-danger mx-2"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}