import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData, exerciseOptions } from "../utils/fetchData";

import { Box, Typography } from "@mui/material";

import ExercisesHorizontalScrollBar from "../components/ExercisesHorizontalScrollBar";

const ExerciseDetail = () => {
  const params = useParams();
  const [exerciseData, setExerciseData] = useState({});
  const [exercises, setExercises] = useState({});
  useEffect(() => {
    const fetchExerciseDetail = async () => {
      const fetchedExerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/exercise/${params.id}`, exerciseOptions);

      setExerciseData(fetchedExerciseData);
    };
    const fetchAllExercises = async () => {
      const fetchedExercises = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      
      setExercises(fetchedExercises);
    }

    fetchAllExercises();

    fetchExerciseDetail();
  }, [params]);

  // const similarExercisesBodyPart = exercises.filter((exercise) => 
  //   exercise.bodyPart.toLowerCase().includes(exerciseData.bodyPart.toLowerCase()));
  // const similarExercisesEquipment = exercises.filter((exercise) => 
  //   exercise.equipment.toLowerCase().includes(exerciseData.equipment.toLowerCase()));

  return (
    <div>
      <Typography variant="h3">{exerciseData.name}</Typography>

      <Typography variant="h4">Similar exercises for {exerciseData.bodyPart}</Typography>
      <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
        <ExercisesHorizontalScrollBar data={Object.values(exercises).filter((exercise) => exercise.bodyPart.includes(exerciseData.bodyPart ))} />
      </Box>

      <Typography variant="h4">Similar exercises by using {exerciseData.equipment}</Typography>
      <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
        <ExercisesHorizontalScrollBar data={Object.values(exercises).filter((exercise) => exercise.equipment.includes(exerciseData.equipment))} />
      </Box>
    </div>
  );
};

export default ExerciseDetail;
