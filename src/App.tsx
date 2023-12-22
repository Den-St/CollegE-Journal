import { useEffect } from 'react';
import axiosConfig from './axiosConfig';
import { Layout } from './components/Layout';
import { RoutesSwitch } from './consts/routes';
import { themes } from './consts/themes';
import './globalStyles.scss';
import { AuthProdiver } from './providers/authProvider';
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
  // useEffect(() => {
  //   try{
  //     axiosConfig.post(,).then(res => console.log(res.data));
  //   }catch(err){
  //     console.error(err);
  //   }
  // },[])
  return <Layout>
    <AuthProdiver>
      <RoutesSwitch/>
    </AuthProdiver>
  </Layout>
}

export default App;
