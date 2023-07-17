import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import * as React from 'react';


const RatingComponent = ({addToRatedFilms, filmId}) => {

const [value, setValue] = React.useState(null)

return (
    <div>
        <Typography component="legend">Rate this film</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue)
                addToRatedFilms(filmId, newValue);
                }}
            />
    </div>
)
}
export default RatingComponent