import { Layout } from './components/Layout';
import { RoutesSwitch } from './consts/routes';
import './globalStyles.scss';

function App() {
  return <Layout>
    <RoutesSwitch/>
  </Layout>
}

export default App;
