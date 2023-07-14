import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import * as React from 'react';


const RatingComponent = ({addToWishlist, filmId}) => {

const [value, setValue] = React.useState(null)

return (
    <div>
        <Typography component="legend">Rate this film</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue)
                addToWishlist(filmId, newValue);
                }}
            />
    </div>
)
}
export default RatingComponent