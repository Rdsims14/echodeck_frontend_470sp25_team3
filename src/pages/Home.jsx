import React, { useEffect, useState, useRef } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import AuthService from '../auth/AuthService';
import { API_BASE_URL } from '../api';
// Ensure API_BASE_URL is defined in your environment or config
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
    // Ensure these limits are defined in your environment or config
    useEffect(() => {
        fetchHoverData();
    }, []);
    // Fetch hover data on initial load
    useEffect(() => {
        sessionStorage.setItem('sounds', JSON.stringify(sounds));
    }, [sounds]);
    // Save sounds to session storage whenever they change
    useEffect(() => {
        if (isAuthenticated) {
            fetchUserSounds();
        }
    }, [isAuthenticated]);
    // Fetch user sounds if authenticated
    const fetchUserSounds = async () => {
        try {
            const config = { headers: AuthService.getAuthHeader() };
            const result = await axios.get(`${API_BASE_URL}/api/soundboard/my-sounds`, config);
            setSounds(result.data);
        } catch (error) {
            console.error("Error fetching user sounds:", error);
            alert("Could not load your sounds. Please try again later.");
        }
    }
    // Fetch hover data from API
    const fetchHoverData = async () => {
        try {
            // Add auth headers if user is authenticated
            const config = isAuthenticated ? { headers: AuthService.getAuthHeader() } : {};
            const result = await axios.get(`${API_BASE_URL}/api/sounds`, config);

            // Ensure we're always setting an array
            const soundsArray = Array.isArray(result.data) ? result.data :
                (result.data?.sounds || result.data?.data || []);
            // Set hover data to the fetched sounds
            setHoverData(soundsArray);
        } catch (error) {
            console.error("Error fetching sounds:", error);
            alert("Could not load sounds. Please try again later.");
            setHoverData([]); // Set empty array on error
        }
    };
    // Handle adding a sound to the soundboard
    const handleAddSound = async (sound) => {
        const soundExists = sounds.some((existingSound) => existingSound.id === sound.id);
        // Check if the sound is already in the soundboard
        if (soundExists) {
            alert("This sound is already added!");
            return;
        }

        // Check sound limits based on authentication
        const currentLimit = isAuthenticated ? MAX_SOUNDS_USER : MAX_SOUNDS_GUEST;
        // Ensure the soundboard does not exceed the limit
        if (sounds.length >= currentLimit) {
            const message = isAuthenticated
                ? `You've reached the maximum of ${currentLimit} sounds.`
                : `Guests are limited to ${currentLimit} sounds. Sign in to add up to ${MAX_SOUNDS_USER} sounds.`;

            alert(message);
            return;
        }
        // Proceed to add the sound
        try {
            if (isAuthenticated) {
                const config = { headers: AuthService.getAuthHeader() };
                const result = await axios.post(`${API_BASE_URL}/api/soundboard/add/${sound.id}`, {}, config);
            }

            const updatedSounds = [...sounds, sound];
            setSounds(updatedSounds);
            setPopoverVisible(false);
        } catch (error) {
            console.error("Error adding sound:", error);
            alert("Could not add the sound. Please try again later.");
        }
    };
    // Handle playing a sound
    const handlePlaySound = (soundId) => {
        const audioElement = document.getElementById(`audio-${soundId}`);
        if (audioElement) {
            audioElement.play();
        }
    };
    // Handle removing a sound from the soundboard
    const handleRemoveSound = async (soundId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this sound?");

        if (isConfirmed) {
            try {
                if (isAuthenticated) {
                    const config = { headers: AuthService.getAuthHeader() };
                    const result = await axios.delete(`${API_BASE_URL}/api/soundboard/remove/${soundId}`, config);
                }

                const updatedSounds = sounds.filter((sound) => sound.id !== soundId);
                setSounds(updatedSounds);
            } catch (error) {
                console.error("Error deleting sound:", error);
                alert("Could not delete the sound. Please try again later.");
            }
        }
    };

    // Update your getPopoverPlacement function
    const getPopoverPlacement = () => {
        // Get viewport height and width
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const addButtonPosition = document.querySelector('.add-sound-button')?.getBoundingClientRect();

        // For mobile devices (viewport width < 768px), use 'auto' placement
        if (viewportWidth < 768) {
            return 'auto';
        }

        if (addButtonPosition) {
            // Check if there's enough space below (need at least 350px for popover)
            const spaceBelow = viewportHeight - addButtonPosition.bottom;
            return spaceBelow < 350 ? 'top' : 'bottom';
        }

        return 'bottom';
    };

    // Add this function to prevent body scrolling when popover is open
    const toggleBodyScroll = (disable) => {
        if (disable) {
            // Save the current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // Restore the scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    };
    // Popover content for adding sounds
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
                            {Array.isArray(hoverData) && hoverData.length > 0 ? (
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
    // Main component rendering
    return (
        <div className='container-fluid p-0'>
            <div className='py-4'>
                <div className='row row-cols-auto justify-content-center g-0'>
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
                            placement={getPopoverPlacement()}
                            overlay={popover}
                            show={popoverVisible}
                            onToggle={(nextShow) => {
                                // Toggle body scrolling when popover opens/closes
                                toggleBodyScroll(nextShow);

                                // Recalculate placement whenever the popover is toggled
                                getPopoverPlacement();
                                setPopoverVisible(nextShow);
                            }}
                            rootClose={true}
                        >
                            <Link
                                to="#"
                                className='d-flex align-items-center justify-content-center add-sound-button' // Added class for reference
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