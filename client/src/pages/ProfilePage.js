// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        location: ''
    });

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        // Fetch the user profile data
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile', {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, [auth.token]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/profile', formData, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });

            console.log('Profile updated:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
