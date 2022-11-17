import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  return (
    <Link className='exercise-card' to={{
      pathname: `/exercise/${exercise.id}`,
    }}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button sx={{ml: '21px', color: '#fff', background: '#ff8787', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize'}}>
          {exercise.bodyPart}
        </Button>
        <Button sx={{ml: '21px', color: '#fff', background: '#c8dbbe', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize'}}>
          {exercise.target}
        </Button>
      </Stack>
      <Typography ml="21px" mr="21px" color="#393e46" fontWeight="bold" mt="11px" pb="10px" textTransfrom="capitalize" fontSize="22px">
        {exercise.name}
      </Typography>
    </Link >
  )
}

export default ExerciseCard
