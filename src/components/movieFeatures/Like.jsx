import React from 'react';
import { FavoriteBorder, Favorite } from '@material-ui/icons';

const Like = (props) => {
  return (
    <div>
      <div onClick={props.onLiked}>
        {props.liked ? <Favorite /> : <FavoriteBorder />}
      </div>
    </div>
  );
};

export default Like;
