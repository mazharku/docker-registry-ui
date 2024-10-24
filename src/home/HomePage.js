import React from "react";
import "./Home.css";
import { CartBox } from "../cart/CartBox";
import { data } from "../data.js";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/dockerhub');
    };

    const filteredData = data.filter(item => 
        Array.isArray(item.tag) && item.tag.length !== 0
    );

    return (
        <div className="home-page-container">
            <div className="top-bar">
                <Button 
                    variant="contained" 
                    className="docker-hub-btn" 
                    onClick={handleNavigate}
                >
                    Search In Docker Hub
                </Button>
            </div>

            {filteredData.length === 0 ? (
                <div>No images are found.</div> 
            ) : (
                filteredData.map(item => (
                    <CartBox key={item.id} data={item} />
                ))
            )}
        </div>
    );
}
