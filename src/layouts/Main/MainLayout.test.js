// Libraries
import { render, screen } from '@testing-library/react';

// Components
import MainLayout from '.';

test('Render Error Message', () => {
  render(<MainLayout><div>Testing Text</div></MainLayout>);
  expect(screen.getByText(/Testing Text/i)).toBeInTheDocument();
});