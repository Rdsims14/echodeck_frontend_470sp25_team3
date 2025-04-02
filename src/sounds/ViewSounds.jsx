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
        }
    };

    if (!sound) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{sound.name}</h2>
            <audio controls>
                <source src={sound.file_url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <p>{sound.description}</p>
            <Link to="/" className="btn btn-primary">Back to Sounds</Link>
        </div>
    );
}