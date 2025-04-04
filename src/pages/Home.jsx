import React, { useEffect, useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const [sounds, setSounds] = useState([]);
    const [hoverData, setHoverData] = useState([]); // State for hover (pop-up tab) data

    useEffect(() => {
        fetchSounds();
        // TODO: Fetch hover (pop-up tab) data from the backend when implemented
    }, []);

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

    // Popover content for the "Add Sound" button
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Artist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* TODO: Replace this static data with data from the backend */}
                        {hoverData.length > 0 ? (
                            hoverData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{data.artist}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No data available</td>
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
                        <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
                            <Link
                                to="/add-sound"
                                className='d-flex align-items-center justify-content-center'
                                style={{
                                    width: '50px', height: '50px', fontSize: '24px', borderRadius: '50%',
                                    border: '2px solid black', textDecoration: 'none', color: 'black',
                                    backgroundColor: 'white', transition: 'background-color 0.3s, color 0.3s',
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