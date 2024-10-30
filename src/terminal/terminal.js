import React, { useState } from 'react';
import { Dialog, Box, TextField, Typography, Button, IconButton } from '@mui/material';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import './terminal.css';

export const TerminalModal = ({ open, onClose }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleInputChange = (e) => setInput(e.target.value);

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Display the entered command in the output
            setOutput(prev => [...prev, `> ${input}`]);

            // Send the command to the API
            try {
                const response = await fetch(`http://localhost:4000/api/execute-command`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ command: input })
                });
                const data = await response.json();
                
                // Display the response from the API
                setOutput(prev => [...prev, data.result]);
            } catch (error) {
                setOutput(prev => [...prev, "Error: Unable to execute command"]);
            }

            setInput(''); // Clear input after submitting
        }
    };

    const handleMinimize = () => setIsMinimized(!isMinimized);

    const handleClose = () => {
        setInput('');
        setOutput([]);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <Box className="terminal-header">
                <Typography variant="h6">Terminal</Typography>
                <Box>
                    <IconButton onClick={handleMinimize}>
                        <MinimizeIcon />
                    </IconButton>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
            {!isMinimized && (
                <Box className="terminal-container">
                    <Box className="output">
                        {output.map((line, index) => (
                            <Typography key={index} variant="body2" className="output-line">{line}</Typography>
                        ))}
                    </Box>
                    <TextField
                        variant="standard"
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        className="input-field"
                        placeholder="Enter command..."
                    />
                </Box>
            )}
        </Dialog>
    );
};
