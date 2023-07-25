import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({open,handleDrawerOpen,handleOpenUserMenu,anchorElUser,handleCloseUserMenu}) {

  return (
   
      <Container maxWidth="xl">
        <Toolbar disableGutters>
      <AdbIcon sx={{ display: { xs: 'none',...(!open && { md: 'flex' }),  }, mr: 1 }} />  
      <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ display: { ...(open ? { md: 'flex' } :{ md: 'none' } ),  }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: {  md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Admin UI
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
               display: {xs: 'none', ...(!open && { md: 'flex' }),  } 
            }}
          >
            <MenuIcon />
          </IconButton>
          <AdbIcon sx={{ display: { xs: 'none',...(open && { md: 'flex' }),  }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: {  md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={anchorElUser}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
  );
}
export default ResponsiveAppBar;
