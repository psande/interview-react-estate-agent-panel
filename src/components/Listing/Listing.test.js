// Libraries
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Listing from '.';

// Data
import listing from './Listing.json';


test('Render Listing', () => {
  const buttonHandler = jest.fn();
  const renderHandler = render(<Listing key={listing.id} listing={listing} expire={buttonHandler}/>);

  // Check initial render.
  expect(screen.getByText(/£425,000/i)).toBeInTheDocument();
  expect(screen.getAllByText('1')).toHaveLength(3);
  expect(screen.getByText(/1 bed house for sale/i)).toBeInTheDocument();
  expect(screen.getByText(/Mansford Street, London, E3/i)).toBeInTheDocument();
  expect(screen.getByText(/Expire Listing/i)).toBeInTheDocument();
  expect(screen.queryByText(/Publish Listing/i)).toBeNull();

  // Check button state after clicking it.
  userEvent.click(screen.getByText(/Expire Listing/i));
  expect(screen.getByText(/Expire Listing/i)).toBeInTheDocument();
  expect(screen.queryByText(/Publish Listing/i)).toBeNull();

  // Check callback function has been called once.
  expect(buttonHandler).toHaveBeenCalledTimes(1);

  // Re-render expired listing.
  listing.expired = true;
  renderHandler.rerender(<Listing key={listing.id} listing={listing} expire={buttonHandler}/>);
  expect(screen.getByText(/£425,000/i)).toBeInTheDocument();
  expect(screen.getAllByText('1')).toHaveLength(3);
  expect(screen.getByText(/1 bed house for sale/i)).toBeInTheDocument();
  expect(screen.getByText(/Mansford Street, London, E3/i)).toBeInTheDocument();
  expect(screen.getByText(/Publish Listing/i)).toBeInTheDocument();
  expect(screen.queryByText(/Expire Listing/i)).toBeNull();

  // Check button state after clicking button.
  userEvent.click(screen.getByText(/Publish Listing/i));
  expect(screen.getByText(/Publish Listing/i)).toBeInTheDocument();
  expect(screen.queryByText(/Expire Listing/i)).toBeNull();

  // Check callback function has been called twice.
  expect(buttonHandler).toHaveBeenCalledTimes(2);
});