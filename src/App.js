//import logo from './logo.svg';
import './App.css';
//import PickingJarContainer from './containers/PickingJarContainer';
import Experiment from './components/Experiment';

function App() {



  return (
    <div className="App" style={{backgroundColor:"beige"}}>
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
  </header> */}
      {/*<div id='jar-row' style={{flexWrap:'wrap', display:'flex', flexDirection:'row', justifyContent: 'space-evenly', alignItems: 'top', margin:'20px'}}>
        <PickingJarContainer key='1'/>
        <PickingJarContainer key='2'/>
        <PickingJarContainer key='3'/>
      </div>*/}

      <Experiment/>
    </div>
  );
}

export default App;
