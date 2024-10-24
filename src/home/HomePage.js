import React from "react";
import "./Home.css"
import { CartBox } from "../cart/CartBox";
import { data } from "../data.js"
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/dockerhub');
    };


    return (
        <div className="home-page-container">
            <div className="top-bar">
                <Button variant="contained"
                    className="docker-hub-btn"
                    onClick={handleNavigate}>
                    Search In Docker Hub
                </Button>
            </div>

            {data.map(item => (
                <CartBox key={item.id} data={item} />
            ))}
        </div>
    )
}

