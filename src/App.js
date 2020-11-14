import './App.css';
import Mainlayout from './layouts/Mainlayout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Mainlayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
