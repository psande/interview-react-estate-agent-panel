// Libraries
import {rest} from 'msw';
import {setupServer} from 'msw/node';

// Components
import FetchApi from "./FetchApi";

// Data
import listings from './listings.json';

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


test('Test GET', async () => {
  const fetchedListings = await FetchApi();
  expect(fetchedListings[0].id).toBe(1);
  expect(fetchedListings[1].id).toBe(2);
  expect(fetchedListings[2].id).toBe(3);
});

test('Test PATCH', async () => {
  const patchedListing = await FetchApi(1, true);
  expect(patchedListing.id).toBe(1);
  expect(patchedListing.expired).toBe(true);
});