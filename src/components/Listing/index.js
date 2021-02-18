/**
 * Individual Listing card.
 *
 * Here we render the card and handle the expiring state.
 * I've left behind some info from the card, included some data validations or dynamic images.
 */

// Libraries
import classNames from 'classnames';
import numeral from 'numeral';

// Components
import Button from '../Button';

// Styles
import './Listing.scss';

// Assets
import {ReactComponent as AgentLogo} from '../../assets/purple-bricks.svg';
import {ReactComponent as BedroomsIcon} from '../../assets/icons/bedrooms.svg';
import {ReactComponent as BathroomsIcon} from '../../assets/icons/bathrooms.svg';
import {ReactComponent as LivingsIcon} from '../../assets/icons/livings.svg';


const Listing = props => {

  const expireListing = () => {
    // This promise can be used to disable the button while the API is being queried.
    if (typeof props.expire === 'function') props.expire(!props.listing.expired);
  }

  return (
    <div className={classNames('Listing', {'Listing--expired': props.listing.expired})}>
      <div className='Listing__info'>
        {/*Main Picture*/}
        <div className='Listing__image'>
          <img alt='House' title='House' src={`/static/images/${props.listing.id}.jpg`}/>
        </div>

        {/*Information Details*/}
        <div className='Listing__details'>
          <div className='Listing__details__top'>
            <div className='Listing__price'>
              <span>Guide price</span>
              <h3>{`${props.listing.currency}${numeral(props.listing.asking_price).format('0,0[.]00')}`}</h3>
            </div>
            <div className='Listing__agent'>
              <AgentLogo/>
            </div>
          </div>

          <div className='Listing__details__bottom'>
            <div className='Listing__rooms'>
              <BedroomsIcon/><span>{props.listing.rooms.bedrooms}</span>
              <BathroomsIcon/><span>{props.listing.rooms.bathrooms}</span>
              <LivingsIcon/><span>{props.listing.rooms.livings}</span>
            </div>

            <h2 className='Listing__description'>
              {`${props.listing.rooms.bedrooms} bed${(props.listing.rooms.bedrooms === 1) ? '' : 's'} ${props.listing.type} for sale`}
            </h2>
            <span className='Listing__address'>
              {`${props.listing.address.line_1}, ${props.listing.address.line_2}, ${props.listing.address.post_code}`}
            </span>
          </div>
        </div>
      </div>

      {/*Expire Button*/}
      <div className='Listing__actions'>
        <Button onClick={expireListing}>{props.listing.expired ? 'Publish Listing' : 'Expire Listing'}</Button>
      </div>
    </div>
  )
}

export default Listing;