//import logo from './logo.svg';
import './App.css';
//import PickingJarContainer from './containers/PickingJarContainer';
import Experiment from './components/Experiment';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {



  return (
    <div className="App" style={{backgroundColor:"beige"}}>
      <DndProvider backend={HTML5Backend}>

        <Experiment/>
			</DndProvider>
    </div>
  );
}

export default App;
