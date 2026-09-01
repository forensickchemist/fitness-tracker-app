import { defineStore } from 'pinia'
import {
addWorkout as addWorkoutRequest,
getMyWorkouts as getMyWorkoutsRequest,
updateWorkout as updateWorkoutRequest,
deleteWorkout as deleteWorkoutRequest,
completeWorkout as completeWorkoutRequest,
} from '../services/workout.js'

export const useWorkoutStore = defineStore('workout', {
state: () => ({
workouts: [],
isLoading: false,
}),

getters: {
workoutCount: (state) => state.workouts.length,
},

actions: {
async getMyWorkouts() {
try {
this.isLoading = true


    const data = await getMyWorkoutsRequest()

    this.workouts = data

    return data
  } finally {
    this.isLoading = false
  }
},

async addWorkout(name, duration) {
  const workout = await addWorkoutRequest(name, duration)

  this.workouts.unshift(workout)

  return workout
},

async updateWorkout(id, name, duration) {
  const updatedWorkout = await updateWorkoutRequest(
    id,
    name,
    duration
  )

  const index = this.workouts.findIndex(
    (workout) => workout._id === id
  )

  if (index !== -1) {
    this.workouts[index] = updatedWorkout
  }

  return updatedWorkout
},

async deleteWorkout(id) {
  await deleteWorkoutRequest(id)

  this.workouts = this.workouts.filter(
    (workout) => workout._id !== id
  )
},

async completeWorkoutStatus(id) {
  const completedWorkout =
    await completeWorkoutRequest(id)

  const index = this.workouts.findIndex(
    (workout) => workout._id === id
  )

  if (index !== -1) {
    this.workouts[index] = completedWorkout
  }

  return completedWorkout
},


},
})
