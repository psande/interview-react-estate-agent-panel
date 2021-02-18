// Libraries
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

// Components
import ListingsPage from '.';

// Data
import listings from './Listings.json';

//Setup server
const server = setupServer(

  // Fetch all listings call.
  rest.get('http://localhost:3001/listings', (req, res, ctx) => {
    return res(ctx.json(listings))
  }),

  // Toggle expired status call.
  rest.patch('http://localhost:3001/listings/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { expired } = req.body;
    listings[id-1].expired = expired;
    return res(ctx.json(listings[id-1]))
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('Render Listing', async () => {
  const renderHandler = render(<ListingsPage/>);

  // Check loading screen is present.
  expect(screen.getByRole('alert')).toBeInTheDocument();

  // Wait for api call to finish.
  await waitForElementToBeRemoved(screen.getByRole('alert'));

  // Check initial listings render.
  expect(screen.getAllByText(/£425,000/i)).toHaveLength(2);
  expect(screen.getAllByText(/£475,000/i)).toHaveLength(1);
  expect(screen.getAllByText('1')).toHaveLength(8);
  expect(screen.getAllByText('2')).toHaveLength(1);
  expect(screen.getAllByText(/1 bed house for sale/i)).toHaveLength(2);
  expect(screen.getAllByText(/2 beds house for sale/i)).toHaveLength(1);
  expect(screen.getAllByText(/Mansford Street, London, E3/i)).toHaveLength(3);
  expect(screen.getAllByText(/Expire Listing/i)).toHaveLength(2);
  expect(screen.getAllByText(/Publish Listing/i)).toHaveLength(1);

  // Click on the first button.
  const firstButton = screen.getAllByText(/Expire Listing/i)[0];
  userEvent.click(firstButton);

  // Wait for a single Expire Listing to be left on screen and the button clicked to has changed it's text.
  await screen.findByText(/Expire Listing/i)
  expect(firstButton.textContent).toMatch(/Publish Listing/i);
  expect(screen.getAllByText(/Expire Listing/i)).toHaveLength(1);
  expect(screen.getAllByText(/Publish Listing/i)).toHaveLength(2);

  // Re-render and expect the same results as before.
  renderHandler.rerender(<ListingsPage/>);
  expect(firstButton.textContent).toMatch(/Publish Listing/i);
  expect(screen.getAllByText(/Expire Listing/i)).toHaveLength(1);
  expect(screen.getAllByText(/Publish Listing/i)).toHaveLength(2);

  // Click on the first button again.
  userEvent.click(firstButton);

  // Wait for a single Publish Listing to be left on screen and the button clicked to has changed it's text.
  await screen.findByText(/Expire Listing/i)
  expect(firstButton.textContent).toMatch(/Publish Listing/i);
  expect(screen.getAllByText(/Expire Listing/i)).toHaveLength(1);
  expect(screen.getAllByText(/Publish Listing/i)).toHaveLength(2);

  // Re-render and expect the same results as before.
  renderHandler.rerender(<ListingsPage/>);
  expect(firstButton.textContent).toMatch(/Publish Listing/i);
  expect(screen.getAllByText(/Expire Listing/i)).toHaveLength(1);
  expect(screen.getAllByText(/Publish Listing/i)).toHaveLength(2);
});