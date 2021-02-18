// Libraries
import { render, screen } from '@testing-library/react';

// Components
import Button from '.';

test('Render Error Message', () => {
  render(<Button>Testing Text</Button>);
  expect(screen.getByText(/Testing Text/i)).toBeInTheDocument();
});