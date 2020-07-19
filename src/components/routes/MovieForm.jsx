import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Layout from '../layout/Layout';
import { useParams } from 'react-router-dom';

const MovieForm = ({ history }) => {
  const { id } = useParams();

  const handleSave = () => {
    history.push('/movies');
  };
  return (
    <Layout>
      <Typography variant='h2'>Table form</Typography>
      <Typography variant='h4'> {id}</Typography>
      <Button variant='contained' color='primary' onClick={handleSave}>
        Save me
      </Button>
    </Layout>
  );
};

export default MovieForm;
