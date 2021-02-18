/**
 * Listings page.
 *
 * The difference between a page and a regular component is that it has business logic and API calls.
 * Allows for a clear separation of concerns, improved re-usability and code splitting based on routes.
 */

// Libraries
import {useState, useEffect} from 'react';

// API
import FetchApi from '../../api/FetchApi';

// Components
import Listing from '../../components/Listing';
import Loading from '../../components/Loading';
import ErrorMsg from '../../components/ErrorMsg';

// Styles
import './ListingsPage.scss';


const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [caughtError, setCaughtError] = useState(false);

  // Fetch all the listings.
  const getListings = async () => {
    try {
      setIsLoading(true);
      const listings = await FetchApi();
      setListings(listings);
      setIsLoading(false);
    } catch (err) {
      setCaughtError(true);
      setIsLoading(false);
    }
  }

  // Mark listing as expired
  const expireListing = id => async status => {
    const listing = await FetchApi(id, status);
    setListings(listings.map(item => {
      return item.id === listing.id ? listing : item;
    }));
  }

  // Fetch listings on component mount.
  useEffect(() => {
    getListings();
  }, []);

  if (isLoading) return <Loading/>;
  if (caughtError) return <ErrorMsg/>;

  return (
    <div className='ListingsPage'>
      {listings.map(
        listing =>
          <Listing key={listing.id} listing={listing} expire={expireListing(listing.id)}/>
      )}
    </div>
  )
};

export default ListingsPage;