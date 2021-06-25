import './App.css';
import {HashRouter, Route ,Switch} from 'react-router-dom'
import Header from './Components/Header.js'
import Create from './Components/Create.js'
import View from './Components/View.js'
import Edit from './Components/Edit.js'
import Meet from './Components/Meet.js'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header/>
          <Switch>
             <Route exact path='/' component = {Create} />
             <Route path='/view' component = {View} />
             <Route path='/edit' component = {Edit} />  
             <Route path='/joinMeet' component = {Meet} />             
          </Switch>
      </HashRouter>
    </div>
  );
}

export default App;