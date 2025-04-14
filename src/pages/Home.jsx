import React, { useEffect, useState, useRef } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import AuthService from '../auth/AuthService';

export default function Home() {
    const isAuthenticated = AuthService.isAuthenticated();
    const [hoverData, setHoverData] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [sounds, setSounds] = useState(() => {
        const savedSounds = sessionStorage.getItem('sounds');
        return savedSounds ? JSON.parse(savedSounds) : [];
    });

    // Sound limits based on authentication
    const MAX_SOUNDS_GUEST = 5;
    const MAX_SOUNDS_USER = 20;

    useEffect(() => {
        fetchHoverData();
    }, []);

    useEffect(() => {
        sessionStorage.setItem('sounds', JSON.stringify(sounds));
    }, [sounds]);

    const fetchHoverData = async () => {
        try {
            // Add auth headers if user is authenticated
            const config = isAuthenticated ? { headers: AuthService.getAuthHeader() } : {};
            const result = await axios.get('http://localhost:8080/api/sounds', config);
            setHoverData(result.data);
        } catch (error) {
            console.error("Error fetching sounds:", error);
            alert("Could not load sounds. Please try again later.");
        }
    };

    const handleAddSound = (sound) => {
        const soundExists = sounds.some((existingSound) => existingSound.id === sound.id);

        if (soundExists) {
            alert("This sound is already added!");
            return;
        }

        // Check sound limits based on authentication
        const currentLimit = isAuthenticated ? MAX_SOUNDS_USER : MAX_SOUNDS_GUEST;

        if (sounds.length >= currentLimit) {
            const message = isAuthenticated
                ? `You've reached the maximum of ${currentLimit} sounds.`
                : `Guests are limited to ${currentLimit} sounds. Sign in to add up to ${MAX_SOUNDS_USER} sounds.`;

            alert(message);
            return;
        }

        const updatedSounds = [...sounds, sound];
        setSounds(updatedSounds);
        setPopoverVisible(false);
    };

    const handlePlaySound = (soundId) => {
        const audioElement = document.getElementById(`audio-${soundId}`);
        if (audioElement) {
            audioElement.play();
        }
    };

    const handleRemoveSound = (soundId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this sound?");

        if (isConfirmed) {
            const updatedSounds = sounds.filter((sound) => sound.id !== soundId);
            setSounds(updatedSounds);
        }
    };

    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: '400px' }}>
            <Popover.Body className="p-0">
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <table className="table table-sm table-hover mb-0">
                        <thead className="sticky-top bg-light">
                            <tr>
                                <th>Name</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hoverData.length > 0 ? (
                                hoverData.map((sound, index) => (
                                    <tr key={index} onClick={() => handleAddSound(sound)} style={{ cursor: 'pointer' }}>
                                        <td>{sound.name}</td>
                                        <td>
                                            <audio controls style={{ width: '150px', height: '30px' }}>
                                                <source src={sound.fileUrl} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No sounds available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className='container-fluid'>
            <div className='py-4'>
                <div className='row row-cols-auto justify-content-center'>
                    {sounds.map((sound) => (
                        <div key={sound.id} className='col text-center p-4'>
                            <div className='fs-1 mb-3'>&#128266;</div>
                            <div className='fw-bold'>{sound.name}</div>
                            <div className='mt-3'>
                                <audio controls id={`audio-${sound.id}`}>
                                    <source src={sound.fileUrl} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                <div className="mt-2">
                                    <Button
                                        variant='primary'
                                        className='custom-primary-button'
                                        onClick={() => handlePlaySound(sound.id)}>
                                        &#9654;
                                    </Button>
                                    <Link className="btn btn-secondary mx-1" to={`/viewsound/${sound.id}`}>
                                        &#128193;
                                    </Link>
                                    <Button
                                        variant='danger'
                                        className='mx-1'
                                        onClick={() => handleRemoveSound(sound.id)}
                                    >
                                        &#128465;
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Sound Button - Available for both guests and signed-in users */}
                    <div className='col text-center d-flex flex-column align-items-center justify-content-center ms-4'>
                        <OverlayTrigger
                            trigger="click"
                            placement="bottom"
                            overlay={popover}
                            show={popoverVisible}
                            onToggle={(nextShow) => setPopoverVisible(nextShow)}
                            rootClose={true}
                        >
                            <Link
                                to="#"
                                className='d-flex align-items-center justify-content-center'
                                style={{
                                    width: '50px', height: '50px', fontSize: '24px', borderRadius: '50%',
                                    border: '2px solid black', textDecoration: 'none', color: 'black',
                                    backgroundColor: 'white', transition: 'background-color 0.3s, color 0.3s',
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPopoverVisible(!popoverVisible);
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#555C83';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                }}>
                                &#10133;
                            </Link>
                        </OverlayTrigger>
                        <div className='mt-2' style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>Add Sound</div>
                    </div>
                </div>
            </div>
        </div>
    );
}