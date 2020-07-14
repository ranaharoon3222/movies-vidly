import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Link,
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
            <ListItem>
              <Link
                to='/'
                color='inherit'
                component={RouterLink}
                variant='body2'
              >
                Home
              </Link>
            </ListItem>{' '}
            <ListItem>
              <Link
                to='/movies'
                color='inherit'
                component={RouterLink}
                variant='body2'
              >
                Movies
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to='/customer'
                color='inherit'
                component={RouterLink}
                variant='body2'
              >
                Customer
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to='/rental'
                color='inherit'
                component={RouterLink}
                variant='body2'
              >
                Rental
              </Link>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nabar;
