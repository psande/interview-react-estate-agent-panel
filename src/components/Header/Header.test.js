// Libraries
import { render, screen } from '@testing-library/react';

// Components
import Header from '.';

test('Render Header', () => {
  render(<Header />);
  expect(screen.getByText(/Agent Panel/i)).toBeInTheDocument();
});