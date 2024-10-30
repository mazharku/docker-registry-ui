import React, { useState, useEffect } from 'react';
import { TextField, Card, CardContent, Typography, Box, Grid2, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './DockerHubPage.css';
import {TagSelectionDialog} from '../cart/modal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const DockerHubPage = () => {
    const [query, setQuery] = useState("nginx");
    const [openModal, setOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [data, setData] = useState([])

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        if (query) { 
            fetch(`http://localhost:4000/api/registry/docker-hub/search/${query}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    setData(json);
                })
                .catch(error => console.error(error));
        }
    }, [query]);

    const handleImagePull = (image) => {
        setSelectedImage(image);
        setOpenModal(true); 
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const validateInput = (selectedArchitecture, selectedTag) => {
       if(selectedArchitecture==='') {
        throw new Error("Please select an architecture type!")
       }
       if(selectedTag==='') {
        throw new Error("Please select a tag!")
       }
    }

    const handleModalSuccess = async (selectedArchitecture, selectedTag) => {
        console.log("Pulled Image:", selectedImage?.name);
        console.log("Selected Architecture:", selectedArchitecture);
        console.log("Selected Tag:", selectedTag);
        try {
            validateInput(selectedArchitecture, selectedTag);
            const response = await fetch('http://localhost:4000/api/registry/execute-pull', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: selectedImage?.name,
                    architecture: selectedArchitecture,
                    tag: selectedTag
                })
            });
            const data = await response.json();
            console.log(data)
            setOpenModal(false);
            toast.success(data.message || "Action successful", { autoClose: 200 });
        } catch (error) {
            console.error("Error fetching details:", error);
            toast.error(error?.message || "Error!", { autoClose: 200 });
        }
    };

    return (
        <div className="dockerhub-page">
            <ToastContainer position="top-right" />
            <div className="search-container">
                <TextField
                    label="Search Docker Hub"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearch}
                />

            </div>

            <Grid2 container spacing={3} className="cards-container">
                {data?.map(item => (
                        <Grid2 item xs={12} sm={6} key={item.id}>
                            <Card className="dockerhub-card">
                                <CardContent>
                                    <Typography variant="h4" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Architecture: {item.architectures?.join(",")}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        OS: {item.osName}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Last updated: {item.updateDate}
                                    </Typography>
                                    <Typography variant="caption">
                                        Description: {item.description}
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-end" mt={2}>
                                        <Button variant="contained" className="pull-btn reg-btn" onClick={() => handleImagePull(item)}>
                                            Add To Registry
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
            </Grid2>

            {selectedImage && (
                <TagSelectionDialog
                    open={openModal}
                    onClose={handleModalClose}
                    onSuccess={handleModalSuccess}
                    image={selectedImage.name}
                    architectures={selectedImage.architectures}
                    tags={selectedImage.tags}
                />
            )}
        </div>
        
    );
};

