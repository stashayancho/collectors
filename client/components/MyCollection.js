import React from 'react'
import {connect} from 'react-redux'
import {getUserCars} from '../store/user'
import {Container, Message, Card} from 'semantic-ui-react'
import CarCard from './CarCard'

class MyCollection extends React.Component {
  async componentDidMount() {
    await this.props.getUserCars(Number(this.props.match.params.userId))
  }

  render() {
    const cars = this.props.cars
    return (
      <Container>
        {cars ?
          <Card.Group>
            {cars.map(car => <CarCard car={car} key={car.car_id}/>)}
          </Card.Group>
        : <Message color='orange'>You have no cars in your collection yet. View the car catalog to add some!</Message>}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  cars: state.user.cars
})

const mapDispatchToProps = dispatch => ({
  getUserCars: userId => dispatch(getUserCars(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyCollection)
