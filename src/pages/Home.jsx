import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Ensure this import is present

export default function Home() {
    const [sounds, setSounds] = useState([
        { id: 1, name: "Fart" },
        { id: 2, name: "Snake Alert Sound" },
        { id: 3, name: "DAMN!!" },
        { id: 4, name: "Booty Strap" }
    ]);
    
    useEffect(() => {
        fetchSounds();
    });

    const fetchSounds = async () => {
        const result = await axios.get('http://localhost:8080/api/sounds');
        console.log(result.data);
    }
    return (
        <div className='container-fluid'>
            <div className='py-4'>
                <div className='row row-cols-auto justify-content-center'>
                    {sounds.map((sound) => (
                        <div key={sound.id} className='col text-center p-4'>
                            <div className='fs-1 mb-3'>&#128266;</div>
                            <div className='fw-bold'>{sound.name}</div>
                            <div className='mt-3'>
                                <Button variant='primary' className='mx-1'>&#9654;</Button>
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