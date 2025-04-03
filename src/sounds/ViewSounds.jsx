import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewSounds() {
    const { id } = useParams();
    const [sound, setSound] = useState(null);

    useEffect(() => {
        fetchSound();
    }, [id]);

    const fetchSound = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/sounds/${id}`);
            setSound(result.data);
        } catch (error) {
            console.error("Error fetching sound:", error);
            setSound({ error: true });
        }
    };

    if (!sound) return <div className="text-center mt-5">Loading...</div>;
    if (sound.error) return <div className="text-center mt-5 text-danger">Failed to load sound. Please try again later.</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center">{sound.name}</h2>
            <div className="text-center my-4">
                <audio controls>
                    <source src={sound.file_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <p className="text-center">{sound.description || "No description available."}</p>
            <div className="text-center">
                <Link to="/" className="btn btn-primary">Back to Sounds</Link>
            </div>
        </div>
    );
}