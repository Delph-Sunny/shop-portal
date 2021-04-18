import React from 'react';
import Rating  from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

const AverageRating = () => {
  const [value] = React.useState(5);

  return (
    <div>
      {/* <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box> */}
      <>
        <Typography component="legend">Average Rating</Typography>
        <Rating name="read-only" value={value} readOnly />
      </>
      {/* <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Disabled</Typography>
        <Rating name="disabled" value={value} disabled />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Pristine</Typography>
        <Rating name="pristine" value={null} />
      </Box> */}
    </div>
  );
}

export default AverageRating;