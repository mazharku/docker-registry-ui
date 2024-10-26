import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';

export const NavBar= ()=> {
  const NavBarColor = process.env.REACT_APP_NAV_BAR_COLOR|| "#000000";
  const color = process.env.REACT_APP_COLOR|| "#FFFFFF";
  const NavBarTitle = process.env.REACT_APP_TITLE || "Registry UI";
  
  return (
    <Box 
    sx={{
      background: NavBarColor,
      color: color,
      padding: '14px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between', 
    }}
  >
   
    <Typography variant="h6" sx={{ marginLeft: '20px' }}>
      {NavBarTitle}
    </Typography>

    <TextField
      variant="outlined"
      size="small"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: color }} />
          </InputAdornment>
        ),
      }}
      sx={{
        input: { color: color }, 
        fieldset: { borderColor: color },
        '& .MuiOutlinedInput-root:hover fieldset': {
          borderColor: 'gray',
        },
        marginRight: '20px',
      }}
    />
  </Box>
  );
}


export const Footer = () => {
  const NavBarColor = process.env.REACT_APP_NAV_BAR_COLOR || "#000000";
  const color = process.env.REACT_APP_COLOR|| "#FFFFFF";
  const currentYear = new Date().getFullYear();

  return (
    <Box 
    sx={{
      background: NavBarColor,
      color: color,
      padding: '10px',
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', 
    }}
  >
    <Typography variant="caption">Mazhar Ibna Zahur</Typography>

    <Box 
      sx={{
        height: '14px', 
        borderLeft: '1px solid', 
        borderColor: color,
        mx: 1, 
      }} 
    />

    <Typography variant="caption">{currentYear}</Typography>
  </Box>
  )
};


