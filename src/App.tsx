import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RoutesSwitch } from './consts/routes';
import { themes } from './consts/themes';
import './globalStyles.scss';
import { AuthProdiver } from './providers/authProvider';
import { useSideMenuStore } from './store/sideMenuStore';
import { useThemeStore } from './store/themeStore';
import { useUserStore } from './store/userStore';

function App() {
  const theme = useThemeStore().theme;
  const {onCloseSideMenu} = useSideMenuStore();
  const route = useLocation().pathname;
  useEffect(() => {
    if(theme === themes.dark){
      document.body.classList.remove(themes.light);
      document.body.classList.add(theme);
    }else{
      document.body.classList.remove(themes.dark);
      document.body.classList.add(theme);
    }
  },[theme]);
  useEffect(() => {
    window.scrollTo({top:0});
    onCloseSideMenu();
  },[route]);
  
  const user = useUserStore().user;
  console.log(user);
  return <Layout>
    <AuthProdiver>
      <RoutesSwitch/>
    </AuthProdiver>
  </Layout>
}

export default App;
