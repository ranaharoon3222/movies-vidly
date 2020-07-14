import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const MovieForm = ({ match, history }) => {
  const handleSave = () => {
    history.push('/movies');
  };
  return (
    <div>
      <Typography variant='h2'>Table form</Typography>
      <Typography variant='h4'> {match.params.id}</Typography>
      <Button variant='contained' color='primary' onClick={handleSave}>
        Save me
      </Button>
    </div>
  );
};

export default MovieForm;
