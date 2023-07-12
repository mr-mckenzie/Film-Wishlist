import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ExternalServices from '../services/ExternalServices';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid({films}) {


    const mapFilms = (filmsToMap) => {
        let mappedFilms = []
            if (filmsToMap && filmsToMap.length > 0) {
                mappedFilms = filmsToMap.map( film => {
                    return (         
                        <Grid>
                            <Item>{film.title} <br></br>
                            <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" /> </Item>
                        </Grid>
                    )
            })}
        return mappedFilms}

  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {mapFilms(films)}
      </Grid>
    </Box>
  );
}