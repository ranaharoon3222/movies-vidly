import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '20px',
  },
  title: {
    flexGrow: 1,
  },
  nav: {
    display: 'flex',
  },
  navbar: {
    marginBottom: '30px',
  },
}));

const Nabar = () => {
  const classes = useStyles();
  const headerMenu = [
    {
      navItem: 'Home',
      path: '/',
    },
    {
      navItem: 'Movies',
      path: '/movies',
    },
    {
      navItem: 'Customer',
      path: '/customer',
    },
    {
      navItem: 'Rental',
      path: '/rental',
    },
    {
      navItem: 'Login',
      path: '/login',
    },
    {
      navItem: 'Register',
      path: '/register',
    },
  ];

  return (
    <div>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <Menu />
          </IconButton>
          <List component='nav' className={classes.nav}>
            {headerMenu.map((item, index) => (
              <ListItem key={index}>
                <Button color='inherit' component={RouterLink} to={item.path}>
                  {item.navItem}
                </Button>
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nabar;
