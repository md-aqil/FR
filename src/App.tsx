import { Theme } from './settings/types';
import { FRAdvisoryLanding } from './components/generated/FRAdvisoryLanding';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return <FRAdvisoryLanding />;
}

export default App;