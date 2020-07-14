import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TableFilter = ({
  genre,
  onSelected,
  textProperty,
  valueProperty,
  selectedGenre,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component='nav' aria-label='main mailbox folders'>
        {genre.map((item) => (
          <ListItem
            button
            key={item[valueProperty]}
            onClick={() => onSelected(item)}
            selected={item === selectedGenre}
            disabled={item === selectedGenre}
          >
            <ListItemText primary={item[textProperty]} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default TableFilter;
