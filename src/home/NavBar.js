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
          InputProps={{
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
        textAlign: 'center',
        padding: '5px',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Typography variant="body1">Mazhar Ibna Zahur</Typography>
      <Typography variant="body2">&copy; {currentYear}</Typography>
    </Box>
  );
};


