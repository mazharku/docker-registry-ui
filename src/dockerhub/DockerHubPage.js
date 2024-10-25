import React, { useState, useEffect } from 'react';
import { TextField, Card, CardContent, Typography, Box, Grid2, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './DockerHubPage.css';


export const DockerHubPage = () => {
    const [query, setQuery] = useState("nginx");

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    const [data, setData] = useState([])

    useEffect(() => {
        if (query) { 
            fetch(`http://localhost:4000/api/search?q=${query}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    setData(json);
                })
                .catch(error => console.error(error));
        }
    }, [query]);

    return (
        <div className="dockerhub-page">
            <div className="search-container">
                <TextField
                    label="Search Docker Hub"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearch}
                />

            </div>

            <Grid2 container spacing={3} className="cards-container">
                {data?.summaries
                    ?.map(item => (
                        <Grid2 item xs={12} sm={6} key={item.id}>
                            <Card className="dockerhub-card">
                                <CardContent>
                                    <Typography variant="h4" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Architecture: {item.architectures
                                            .filter(os => os.name !== "" && os.name !== "unknown")
                                            .map(arc => arc.name).join(",")}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        OS: {item.operating_systems
                                            .filter(os => os.name !== "" && os.name !== "unknown")
                                            .map(os => os.name).join(",")}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Last updated: {item.updated_at}
                                    </Typography>
                                    <Typography variant="caption">
                                        Description: {item.short_description}
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-end" mt={2}>
                                        <Button variant="contained" className="pull-btn reg-btn">
                                            Add To Registry
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
            </Grid2>
        </div>
    );
};

