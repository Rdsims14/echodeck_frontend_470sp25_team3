import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddSounds() {
    let navigate = useNavigate();

    const [sound, setSound] = useState({
        name: "",
        description: "",
        file: null,
    });

    const { name, description, file } = sound;

    const onInputChange = (e) => {
        setSound({ ...sound, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        setSound({ ...sound, file: e.target.files[0] });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("file", file);

        try {
            await axios.post("/api/sounds", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/sounds");
        } catch (error) {
            console.error("Error uploading sound:", error);
        }
    };

    return (
        <div className="container">
            <h2>Add New Sound</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={description}
                        onChange={onInputChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="file">File</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        name="file"
                        onChange={onFileChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

