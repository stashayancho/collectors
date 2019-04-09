import React from 'react'
import { connect } from 'react-redux'
import { Card, Button, Image } from 'semantic-ui-react'
import { addToCollection, removeFromCollection } from '../store/user'

const CarCard = props => {

  const userId = props.user.id
  const car = props.car
  console.log('car', car)
  return (
    <Card color="orange">
      <Card.Content>
        <Image size="small" src={car.car_photo} />
        <Card.Header floated='center'>{car.model_name}</Card.Header>
        <Card.Meta>{car.series}</Card.Meta>
        <Card.Content extra>
          { props.button === 'add'
            ? <Button onClick={() => props.addToCollection(car, userId)}>Add to my Collection</Button>
            : <Button onClick={() => props.removeFromCollection(car, userId)}>Remove from my Collection</Button>
          }
        </Card.Content>
      </Card.Content>
    </Card>
  )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  addToCollection: (car, userId) => dispatch(addToCollection(car, userId)),
  removeFromCollection: (car, userId) => dispatch(removeFromCollection(car, userId))
})

export default connect(mapState, mapDispatch)(CarCard)
