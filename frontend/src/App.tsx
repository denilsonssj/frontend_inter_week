import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from 'styles/globalStyles';
import { theme } from 'styles/themes';
import { AuthProvider } from 'context/AuthContext';
import Routes from './routes';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );

}

export default App;
