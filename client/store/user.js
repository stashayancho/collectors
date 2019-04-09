import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GOT_USER_CARS = 'GOT_USER_CARS'
const ADDED_TO_COLLECTION = 'ADD_TO_COLLECTION'
const REMOVED_FROM_COLLECTION = 'REMOVED_FROM_COLLECTION'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const gotUserCars = cars => ({ type: GOT_USER_CARS, cars })
const addedToCollection = car => ({ type: ADDED_TO_COLLECTION, car })
const removedFromCollection = carId => ({ type: REMOVED_FROM_COLLECTION, carId })

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const getUserCars = userId => async dispatch => {
  try {
    const  { data } = await axios.get(`/api/users/${userId}/cars`)
    dispatch(gotUserCars(data))
  } catch (err) {
    console.error(err)
  }
}

export const addToCollection = (car, userId) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/users/${userId}/cars`, car)
    dispatch(addedToCollection(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCollection = (car, userId) => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/users/${userId}/cars/${car.car_id}`)
    dispatch(removedFromCollection(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GOT_USER_CARS:
      return {...state, cars: action.cars}
    case ADDED_TO_COLLECTION:
      return {...state, cars: [...state.cars, action.car]}
    case REMOVED_FROM_COLLECTION:
      return {...state, cars: state.cars.filter(car => car.car_id !== action.carId)}
    default:
      return state
  }
}
