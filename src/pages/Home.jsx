import React, { useEffect, useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const [sounds, setSounds] = useState([]);
    const [hoverData, setHoverData] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false);

    useEffect(() => {
        fetchHoverData();
    }, []);

    const fetchHoverData = async () => {
        try {
            const result = await axios.get('http://localhost:8080/api/sounds');
            setHoverData(result.data);
        } catch (error) {
            console.error("Error fetching hover data:", error);
        }
    };

    const handleAddSound = (sound) => {
        setSounds((prevSounds) => [...prevSounds, sound]);
        setPopoverVisible(false);
    };

    const handlePlaySound = (soundId) => {
        const audioElement = document.getElementById(`audio-${soundId}`);
        if (audioElement) {
            audioElement.play();
        }
    };

    // Function to remove a sound from the user's page
    const handleRemoveSound = (soundId) => {
        setSounds((prevSounds) => prevSounds.filter((sound) => sound.id !== soundId));
    };

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <table className="table table-sm">
                    <thead>
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
                                        <audio controls>
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
                                    <Button variant='primary' className='mx-1' onClick={() => handlePlaySound(sound.id)}>&#9654;</Button>
                                    <Link className="btn btn-secondary mx-1" to={`/viewsound/${sound.id}`}>
                                        &#128193;
                                    </Link>
                                    <Button
                                        variant='danger'
                                        className='mx-1'
                                        onClick={() => handleRemoveSound(sound.id)} // Attach the remove function
                                    >
                                        &#128465;
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='col text-center d-flex flex-column align-items-center justify-content-center ms-4'>
                        <OverlayTrigger
                            trigger="click"
                            placement="bottom"
                            overlay={popover}
                            show={popoverVisible}
                            onToggle={() => setPopoverVisible(!popoverVisible)}
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
                                    e.target.style.backgroundColor = 'lightgrey';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                }}>
                                &#10133;
                            </Link>
                        </OverlayTrigger>
                        <div className='mt-2'>Add Sound</div>
                    </div>
                </div>
            </div>
        </div>
    );
}