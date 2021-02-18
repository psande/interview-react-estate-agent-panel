/**
 * Reusable Header component.
 */

// Styles
import './Header.scss';

// Assets
import {ReactComponent as Logo} from '../../assets/logo.svg';

const Header = () => {
  return (
    <div className='Header'>
      <Logo/>
      <div>
        <h1>Houses</h1>
        <h2>Agent Panel</h2>
      </div>
    </div>
  )
}

export default Header;