import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData, exerciseOptions } from "../utils/fetchData";

import { Grid, Box, Typography } from "@mui/material";

import ExercisesHorizontalScrollBar from "../components/ExercisesHorizontalScrollBar";

const ExerciseDetail = () => {
  const params = useParams();
  const [exerciseData, setExerciseData] = useState({});
  const [exercises, setExercises] = useState({});
  useEffect(() => {
    const fetchAllExercises = async () => {
      const fetchedExercises = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      
      setExercises(fetchedExercises);
    }
    fetchAllExercises();
  }, []);
  useEffect(() => {
    const fetchExerciseDetail = async () => {
      const fetchedExerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/exercise/${params.id}`, exerciseOptions);

      setExerciseData(fetchedExerciseData);
    };
    fetchExerciseDetail();
  }, [params]);

  // const similarExercisesBodyPart = exercises.filter((exercise) => 
  //   exercise.bodyPart.toLowerCase().includes(exerciseData.bodyPart.toLowerCase()));
  // const similarExercisesEquipment = exercises.filter((exercise) => 
  //   exercise.equipment.toLowerCase().includes(exerciseData.equipment.toLowerCase()));

  return (
    <>
    <Grid container spacing={2}>
      <Typography color="#61764B" fontWeight="600" fontSize="40px" textTransform="capitalize">{exerciseData.name}</Typography>
      <img src={exerciseData.gifUrl} alt="gif" />
    </Grid>
      <Typography variant="h4">Similar exercises for {exerciseData.bodyPart}</Typography>
      <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
        <ExercisesHorizontalScrollBar data={Object.values(exercises).filter((exercise) => exercise.bodyPart.includes(exerciseData.bodyPart ))} />
      </Box>

      <Typography variant="h4">Similar exercises by using {exerciseData.equipment}</Typography>
      <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
        <ExercisesHorizontalScrollBar data={Object.values(exercises).filter((exercise) => exercise.equipment.includes(exerciseData.equipment))} />
      </Box>
    </>
  );
};

export default ExerciseDetail;
