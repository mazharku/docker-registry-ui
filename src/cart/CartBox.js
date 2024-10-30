import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Collapse, Button, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DetailsModal, DailogModal } from './modal'
import { toast } from 'react-toastify';

export const CartBox = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cartCount = data?.tags?.length || 0;


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card variant="outlined"
            sx={{
                marginBottom: 2,
                border: 0.4,
                color: "#000000",
                boxShadow: '1px 1px 1px 1px rgba(244, 244, 244, 0.3)',
                background: "#FFFFFF",

            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>{data?.name}</Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body2" sx={{ marginRight: 1, fontSize: '0.9rem', color: '#6c757d' }}>
                            {cartCount <= 1 ? (
                                <span>{cartCount} Tag</span>
                            ) : (
                                <span>{cartCount} Tags</span>
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
                        <ChildCart key={index} item={item} image={data?.name} />
                    ))}
                </Box>
            </Collapse>
        </Card>
    );
};

const ChildCart = ({ item, image }) => {
    const [copied, setCopied] = useState(false);
    const [details, setDetails] = useState(null);
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const host = apiUrl.replace(/^https?:\/\//, '');
    const dockerPullCommand = `docker pull ${host}/${image}:${item}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(dockerPullCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };


    const handleDelete = (image, tag) => {
        setOpenDialog(true);
        console.warn(image, " tag is : ", tag);

    }

    const deleteTag = async (image, tag) => {
        try {
            console.log(image, tag)
            toast.success("item deleted successfully")
           const response = await fetch(`http://localhost:4000/api/registry/tag/${image}/${tag}`
                 , {
                     method: 'DELETE',
                     headers: {
                       'Content-Type': 'application/json',
                     },
                   }
            );
            const data = await response.json();
            toast.success(data,{ autoClose: 200 })
            setOpenDialog(false);
        } catch (error) {
            console.error("Error fetching details:", error);
            toast.error(error?.message || "Error!", { autoClose: 200 });
        }

    }
    
    const fetchDetails = async (image, tag) => {
        try {
            const response = await fetch(`http://localhost:4000/api/registry/info/${image}/${tag}`);
            const data = await response.json();

            setDetails(data);
            setOpen(true);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setDetails(null);
    };
    const handleDialogClose = () => {
        setOpenDialog(false);
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
                    sx={{ minWidth: '300px', width: 'fit-content' }}
                />
                <Tooltip title="Copy" placement="top">
                    <IconButton onClick={handleCopy} sx={{ marginLeft: 1 }}>
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>

                {copied && <Typography variant="caption" color="success.main">
                    Done
                </Typography>}
                <Button variant="outlined" sx={{ marginRight: 1 }} onClick={() => fetchDetails(image, item)}>Details</Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(image, item)}>Delete</Button>
            </Box>
            {
                details && (
                    <DetailsModal open={open} onClose={handleClose} details={details} />
                )}

            {
                openDialog && (
                    <DailogModal open={openDialog} onClose={handleDialogClose} onSuccess={deleteTag} image={image} tag={item} />
                )}
                
        </Box>
    );
};
