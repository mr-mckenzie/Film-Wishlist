import Rating from '@mui/material/Rating';
import * as React from 'react';


const RatingComponent = ({addToRatedFilms, filmId}) => {

const [value, setValue] = React.useState(null)


React.useEffect(() => 
setValue(null), [filmId])

return (
    <div className="rating_component" >
        <p component="legend">Rate this film</p>
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