// Libraries
import { render, screen } from '@testing-library/react';

// Components
import Loading from '.';

test('Render Loading', () => {
  render(<Loading />);
  expect(screen.getByRole('alert')).toBeInTheDocument();
});