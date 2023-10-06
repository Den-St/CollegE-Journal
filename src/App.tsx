import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { RoutesSwitch } from './consts/routes';
import { themes } from './consts/themes';
import './globalStyles.scss';
import { useThemeStore } from './store/themeStore';

function App() {
  const theme = useThemeStore().theme;
  useEffect(() => {
    if(theme === themes.dark){
      document.body.classList.remove(themes.light);
      document.body.classList.add(theme);
    }else{
      document.body.classList.remove(themes.dark);
      document.body.classList.add(theme);
    }
  },[theme]);

  return <Layout>
    <RoutesSwitch/>
  </Layout>
}

export default App;
