import React, { useState } from "react";
import { Card, CardContent, Modal, Typography, IconButton, Collapse, Button, Box } from "@mui/material";
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
        <Card variant="outlined"
            sx={{
                marginBottom: 2,
                border: 0.4,
                //borderColor: "#00ff00",
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
    const [modalOpen, setModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const host = apiUrl.replace(/^https?:\/\//, '');
    const dockerPullCommand = `docker pull ${host}/${image}:${item}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(dockerPullCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    function deleteTag(image, tag) {
        console.warn(image, " tag is : ", tag);

    }

    const fetchDetails = async (image, tag) => {
    try {
      const response = await fetch(`${apiUrl}/v2/${image}/manifests/${tag}`);
      const data = await response.json();
      
      const parsedDetails = {
        name: data.name,
        tag: data.tag,
        os: data.history[0]?.v1Compatibility ? JSON.parse(data.history[0].v1Compatibility).os : "N/A",
        architecture: data.architecture,
        created: data.history[0]?.v1Compatibility ? JSON.parse(data.history[0].v1Compatibility).created : "N/A",
      };
      
      setDetails(parsedDetails);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
    }

    const handleClose = () => {
        setOpen(false);
        setDetails(null);
      };

    const DetailsModal = ({ open, onClose, details }) => (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
    <Box sx={{
        //inner
      position: 'relative',
      padding: 2,
      maxWidth: 600,
      margin: 'auto',
      mt: '20vh',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: 5,
      borderRadius: 2,
    }}>
      {/* Outer Frame */}
      <Box sx={{
        position: 'absolute',
        top: -3,
        left: -3,
        right: -3,
        bottom: -3,
        backgroundColor: '#F9F9F9',
        borderRadius: 2,
        boxShadow: 5,
        zIndex: -2,
      }} />

      <Typography id="modal-title" variant="h6" sx={{ mb: 2, alignSelf: 'center', fontWeight:800 }}>Image Details</Typography>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'left', width: '80%' }}>
          <Typography variant="body1"><strong>Name:</strong> {details.name}</Typography>
          <Typography variant="body1"><strong>Tag:</strong> {details.tag}</Typography>
          <Typography variant="body1"><strong>OS:</strong> {details.os}</Typography>
          <Typography variant="body1"><strong>Architecture:</strong> {details.architecture}</Typography>
          <Typography variant="body1"><strong>Created:</strong> {new Date(details.created).toLocaleString()}</Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', width: '100%', mt: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Box>
  </Modal>
    );

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
                <Button variant="outlined" sx={{ marginRight: 1 }} onClick={()=> fetchDetails(image, item)}>Details</Button>
                <Button variant="outlined" color="error" onClick={() => deleteTag(image, item)}>Delete</Button>
            </Box>
            {details && (
        <DetailsModal open={open} onClose={handleClose} details={details} />
      )}
    </Box>
    );
};
