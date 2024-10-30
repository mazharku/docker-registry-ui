import { Card, CardContent, Modal, Typography, IconButton, Collapse, Button, Box } from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';

export const DetailsModal = ({ open, onClose, details }) => (
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
      <Typography variant="body1"><strong>OS:</strong> {details.osName}</Typography>
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


export const DailogModal = ({ open, onClose, onSuccess, image, tag }) => (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
<Box sx={{
    //inner
  position: 'relative',
  padding: 2,
  maxWidth: 300,
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

  <Typography id="modal-title" variant="h6" sx={{ mb: 2, alignSelf: 'center', fontWeight:800, color:'red' }}>Are You Sure?</Typography>
  
  <Box sx={{ textAlign: 'center', width: '100%', mt: 2 }}>
    <Button onClick={onClose} variant="contained" color="primary" sx={{marginRight:'5px'}}>
      Close
    </Button>
    <Button onClick={() => onSuccess(image, tag)} variant="contained" sx={{marginLeft:'5px', background:'red'}}>
      Delete
    </Button>
  </Box>
</Box>
</Modal>
);