import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Home() {
    const [sounds, setSounds] = useState([
        { id: 1, name: "SoundName" },
        { id: 2, name: "SoundName" },
        { id: 3, name: "SoundName" },
        { id: 4, name: "SoundName" }
    ]);
    useEffect(() => {
        loadSounds();
    })

    const loadSounds = async () => {
        setUsers((await axios.get(`${API_BASE_URL}/sounds`)).data);
    };
    
    const addSound = () => {
        // This function will add a new sound to the list
        const newSound = {
            id: sounds.length + 1, // Simple ID increment, in real app use UUID or backend generated ID
            name: `SoundName ${sounds.length + 1}`
        };
        setSounds([...sounds, newSound]);
    }

    const deleteSounds = async (id) => {
        await axios.delete(`${API_BASE_URL}/sounds/${id}`, {
          headers: AuthService.getAuthHeader(),
        });
        loadSounds();
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
                                <Button variant='primary' className='mx-1'>&#9654;</Button>
                                <Button variant='secondary' className='mx-1'>&#128193;</Button>
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