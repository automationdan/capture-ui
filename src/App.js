import React, {Component} from 'react'

import './App.css';
import './App.scss';
import { Content } from 'carbon-components-react';
import DataCapHeader from './components/DataCapHeader';
import { Route, Routes } from 'react-router';
import LandingPage from './content/LandingPage';
import DataCap from './content/DataCap';
import Invoices from './content/Invoices';


class App extends Component {



  constructor(props){
    super(props);
    this.state = {
      message : ""
    }
  }
  render(){
    return (
      <div>
        <DataCapHeader />
        <Content>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/DataCap" element={<DataCap />} />
            <Route path="/Invoices" element={<Invoices />} />
          </Routes>
      </Content>
      </div>
    );
  }
}

export default App;
