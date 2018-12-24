import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Item} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <Container>
      <Item.Group>
        <Item>
          <Item.Image size='small' src='default-user.jpeg' />
          <Item.Content verticalAlign='middle'>
            <Item.Header>Welcome, {user.email}</Item.Header>
            <Item.Meta>Collector since: 2018</Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
