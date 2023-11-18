//import logo from './logo.svg';
import './App.css';
//import PickingJarContainer from './containers/PickingJarContainer';
import Experiment from './components/Experiment';
import LabelSheet from './containers/LabelSheet';

function App() {



  return (
    <div className="App" style={{backgroundColor:"beige"}}>
      
      <LabelSheet/>

      <Experiment/>
    </div>
  );
}

export default App;
