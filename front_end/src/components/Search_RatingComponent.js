import Rating from '@mui/material/Rating';
import RatingsFunctions from '../services/RatingsFunctions';
import { useEffect, useState } from 'react';

const RatingComponent = ({ filmId, ratedFilms, setRatedFilms, rating=null }) => {

    const [value, setValue] = useState(rating)

    useEffect(() =>
        setValue(rating), [filmId])

    return (
        <div className="rating_component" >
            <p component="legend">Rate this film</p>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                    RatingsFunctions.addToRatedFilms(filmId, newValue, ratedFilms, setRatedFilms);
                }}
            />
        </div>
    )
}
export default RatingComponent