import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

export default function Home() {
    const [sounds, setSounds] = useState([]);

    useEffect(() => {
        fetchSounds();
    }, []); // Add dependency array to avoid infinite calls

    const fetchSounds = async () => {
        try {
            const result = await axios.get('http://localhost:8080/api/sounds');
            const formattedSounds = result.data.map((sound) => ({
                id: sound.id,
                name: sound.name,
                file_url: sound.file_url,
            }));
            setSounds(formattedSounds);
        } catch (error) {
            console.error("Error fetching sounds:", error);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='py-4'>
                <div className='row row-cols-auto justify-content-center'>
                    {sounds.map((sound) => (
                        <div key={sound.id} className='col text-center p-4'>
                            <div className='fs-1 mb-3'>&#128266;</div>
                            <div className='fw-bold'>{sound.name}</div>
                            <div className='mt-3'>
                                <audio controls>
                                    <source src={sound.file_url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                <Link className="btn btn-secondary mx-1" to={`/viewsound/${sound.id}`}>
                                    &#128193;
                                </Link>
                                <Button variant='danger' className='mx-1'>&#128465;</Button>
                            </div>
                        </div>
                    ))}
                    <div className='col text-center d-flex flex-column align-items-center justify-content-center ms-4'>
                        <Button variant='light' className='rounded-circle d-flex align-items-center justify-content-center' style={{ width: '50px', height: '50px', fontSize: '24px', cursor: 'default' }}>
                            &#10133;
                        </Button>
                        <div className='mt-2'>Add Sound</div>
                    </div>
                </div>
            </div>
        </div>
    );
}