import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Header, Icon} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <Menu>
    <Menu.Item><Header as={Link} to="/cars"><Icon name='fire' />HotCollect</Header> </Menu.Item>
    {isLoggedIn ? (
      <Menu.Menu position='right'>
        <Menu.Item name='My Profile' as={Link} to="/home" />
        <Menu.Item name='Trade Board' as={Link} to='/tradeboard' />
        <Menu.Item name='My Collection' as={Link} to={`/mycollection/${userId}`} />
        <Menu.Item name='Logout' onClick={handleClick} />
      </Menu.Menu>
    ) : (
      <Menu.Menu position='right'>
          <Menu.Item name='login' as={Link} to="/login" />
          <Menu.Item name='sign up' as={Link} to="/signup" />
      </Menu.Menu>
    )}
  </Menu>
)


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
