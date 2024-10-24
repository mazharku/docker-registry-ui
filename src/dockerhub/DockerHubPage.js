import React, { useState } from 'react';
import { TextField, Card, CardContent, Typography, Box, Grid2, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './DockerHubPage.css'; // Create this CSS file for custom styles

export const DockerHubPage = () => {
    const handleSearch = (event) => {
        const query = event.target.value;
        console.log("Search query: ", query);
    };

    const [archType, setArchType] = useState({
        arm64: false,
        amd64: false,
    });

    const handleCheckboxChange = (event) => {
        setArchType({
            ...archType,
            [event.target.name]: event.target.checked,
        });
    };

    const data = [
        {
            id: 1,
            name: 'nginx',
            description: 'Official build of Nginx.',
            architecture: 'AMD64',
            lastUpdate: '6 days ago'
        },
        {
            id: 2,
            name: 'nginx/nginx-ingress',
            description: 'NGINX and NGINX Plus Ingress Controllers for Kubernetes',
            architecture: 'AMD64',
            lastUpdate: '1 hour ago'
        },
        {
            id: 3,
            name: 'auth-service',
            description: 'Authentication manager',
            architecture: 'AMD64',
            lastUpdate: '1 hour ago'
        }
    ];

    return (
        <div className="dockerhub-page">
            <div className="search-container">
                <TextField
                    label="Search Docker Hub"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearch}
                />
                
                <FormGroup row className="checkbox-group">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={archType.arm64}
                                onChange={handleCheckboxChange}
                                name="arm64"
                                color="primary"
                            />
                        }
                        label="arm/64"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={archType.amd64}
                                onChange={handleCheckboxChange}
                                name="amd64"
                                color="primary"
                            />
                        }
                        label="amd/64"
                    />
                </FormGroup>
            </div>

            <Grid2 container spacing={3} className="cards-container">
                {data.map(item => (
                    <Grid2 item xs={12} sm={6} key={item.id}>
                        <Card className="dockerhub-card">
                            <CardContent>
                                <Typography variant="h4" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="overline">
                                    Architecture: {item.architecture}
                                </Typography><br></br>
                                <Typography variant="caption">
                                    Last updated: {item.lastUpdate}
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

