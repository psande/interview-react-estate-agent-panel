/**
 * Here we declare app-wide settings and initializations.
 * It allows us to have different apps with different purposes.
 *
 * Other things that could be declared are things like states (redux), contexts, routers or api urls.
 */

// Layout
import MainLayout from '../layouts/Main';

// Pages
import ListingsPage from '../pages/Listings';

// Styles
import './App.scss';

const App = () => {
  return (
    <MainLayout>
      <ListingsPage/>
    </MainLayout>
  );
};

export default App;