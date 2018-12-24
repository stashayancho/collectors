import axios from 'axios'

const GOT_CARS = 'GOT_CARS'
// const ADDED_TO_COLLECTION = 'ADD_TO_COLLECTION'

const gotCars = cars => ({type: GOT_CARS, cars})
// const addedToCollection = car => ({type: ADDED_TO_COLLECTION, car})

export const getCars = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/cars')
    dispatch(gotCars(data))
  } catch (err) {
    console.error(err)
  }
}

// export const addToCollection = (car, userId) => async dispatch => {
//   try {
//     const  { data } = await axios.post(`/api/users/${userId}/cars`, car)
//     dispatch(addedToCollection(data))
//   } catch (err) {
//     console.error(err)
//   }
// }

export default (state = [], action) => {
  switch (action.type) {
    case GOT_CARS:
      return action.cars
    // case ADDED_TO_COLLECTION:
    //   return [...state, action.car]
      //this will add new car to car catalog as well -> must fix
    default:
      return state
  }
}
