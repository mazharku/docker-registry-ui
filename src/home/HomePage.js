import React, {useState, useEffect } from "react";
import "./Home.css";
import { CartBox } from "../cart/CartBox";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/dockerhub');
    };

    const [imagesWithTags, setImagesWithTags] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            
            const imagesResponse = await fetch(`${apiUrl}/v2/_catalog`);
            const images = await imagesResponse.json();
            const imagesWithTags = await Promise.all(
              images.repositories?.map(async (image) => {
               
                const tagsResponse = await fetch(`${apiUrl}/v2/${image}/tags/list`);
                
                if (!tagsResponse.ok) {
                 
                  return { name: image, tags: [] }; 
                }
      
                const tags = await tagsResponse.json();
                return { name: image, tags: tags.tags };
              })
            );
            console.log("outer : ", imagesWithTags)
            setImagesWithTags(imagesWithTags);
          } catch (error) {
            console.error('Error fetching images and tags:', error);
          }
        };
    
        fetchImages();
      }, []);

    const filteredData = imagesWithTags?.filter(item => {
        console.log("filter", item);
       return Array.isArray(item.tags) && item.tags.length !== 0
});

    return (
        <div className="home-page-container" style={{ marginTop: '64px' }}>
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
