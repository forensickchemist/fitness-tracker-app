import { apiRequest } from './api.js'

export async function addWorkout(name, duration) {
return await apiRequest('/workouts/addWorkout', {
method: 'POST',
body: JSON.stringify({
name,
duration,
}),
})
}

export async function getMyWorkouts() {
return await apiRequest('/workouts/getMyWorkouts')
}

export async function updateWorkout(id, name, duration) {
return await apiRequest(`/workouts/updateWorkout/${id}`, {
method: 'PUT',
body: JSON.stringify({
name,
duration,
}),
})
}

export async function deleteWorkout(id) {
return await apiRequest(`/workouts/deleteWorkout/${id}`, {
method: 'DELETE',
})
}

export async function completeWorkout(id) {
return await apiRequest(
`/workouts/completeWorkoutStatus/${id}`,
{
method: 'PATCH',
}
)
}
