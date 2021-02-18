// Libraries
import { render, screen } from '@testing-library/react';

// Components
import ErrorMsg from '.';

test('Render Error Message', () => {
  render(<ErrorMsg />);
  expect(screen.getByText(/We can't find any results./i)).toBeInTheDocument();
});