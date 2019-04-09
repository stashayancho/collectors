import React from 'react'
import {connect} from 'react-redux'
import {Container, Header, Card} from 'semantic-ui-react'
import CarCard from './CarCard'
import {getCars} from '../store/car'

class CarCatalog extends React.Component {
  async componentDidMount() {
    await this.props.getCars()
  }

  render() {
    const cars = this.props.cars
    return (
      <Container>
        {cars ?
          <Card.Group>
            {cars.map(car => <CarCard car={car} key={car.car_id} button='add' />)}
          </Card.Group>
        : <Header>no cars here</Header>}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  cars: state.car
})

const mapDispatchToProps = dispatch => ({
  getCars: () => dispatch(getCars())
})

export default connect(mapStateToProps, mapDispatchToProps)(CarCatalog)
