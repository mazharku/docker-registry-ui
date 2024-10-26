import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';

export const NavBar= ()=> {
  const NavBarColor = process.env.REACT_APP_NAV_BAR_COLOR|| "#000000";
  const color = process.env.REACT_APP_COLOR|| "#FFFFFF";
  const NavBarTitle = process.env.REACT_APP_TITLE || "Registry UI";
  
  return (
    <AppBar position="static" sx={{ backgroundColor: NavBarColor, color: color }}>
    <Toolbar>
      <Typography variant="h6">
        {NavBarTitle}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          input={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: color }} />
              </InputAdornment>
            ),
          }}
          sx={{
            input: { color: color }, 
            fieldset: { borderColor: 'white' },
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: 'gray',
            },
          }}
        />
      </Box>
    </Toolbar>
  </AppBar>
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
      padding: '8px',
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


