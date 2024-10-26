import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Collapse, Button, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const CartBox = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cartCount = data?.tags?.length || 0;
    

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{data?.name}</Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body2" sx={{ marginRight: 1 }}>
                            {cartCount <= 1 ? (
                                 <span>{cartCount} Image</span>
                            ) : (
                                <span>{cartCount} Images</span>
                            )}
                        </Typography>
                        <IconButton onClick={toggleExpand}>
                            <ExpandMoreIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box sx={{ padding: 2 }}>
                    {data?.tags?.map((item, index) => (
                        <ChildCart key={index} item={item} image={data?.name}/>
                    ))}
                </Box>
            </Collapse>
        </Card>
    );
};

const ChildCart = ({ item, image }) => {
    const [copied, setCopied] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const host = apiUrl.replace(/^https?:\/\//, '');
    const dockerPullCommand = `docker pull ${host}/${image}:${item}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(dockerPullCommand); 
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); 
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 1 }}>
            <Typography variant="body1" sx={{ marginRight: 1 }}>TAG: {item}</Typography>

            <Box>
                <TextField
                    value={dockerPullCommand}
                    slotProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: '300px' ,width: 'fit-content'}}
                />
                <Tooltip title="Copy" placement="top">
                    <IconButton onClick={handleCopy} sx={{ marginLeft: 1 }}>
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>

                {copied && <Typography variant="caption" color="success.main">
                    Done
                </Typography>}
                <Button variant="outlined" sx={{ marginRight: 1 }}>Details</Button>
                <Button variant="outlined" color="error">Delete</Button>
            </Box>
        </Box>
    );
};
