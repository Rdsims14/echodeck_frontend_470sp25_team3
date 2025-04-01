import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../api';

export default function AddSounds() {
  let navigate = useNavigate();

  const [sound, setSound] = useState({
    title: "",
    description: "",
    file: null,
  });

  const { title, description, file } = sound;

  const onInputChange = (e) => {
    setSound({ ...sound, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setSound({ ...sound, file: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      await axios.post(`${API_BASE_URL}/sounds`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding sound:", error);
    }
  };

  return (
    <div className="custom-container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Sound Effect</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">Title</label>
              <input type="text" className="form-control" placeholder="Enter sound title"
                name="title" value={title} onChange={onInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">Description</label>
              <textarea className="form-control" placeholder="Enter sound description"
                name="description" value={description} onChange={onInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="File" className="form-label">Sound File</label>
              <input type="file" className="form-control" name="file" onChange={onFileChange} required />
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}