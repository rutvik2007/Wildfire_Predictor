import React /*,{Component}*/ from 'react'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
//import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
//import './Table.css'
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"
import axios from 'axios'

class ForecastTable extends React.Component {

    constructor(props) {
        super(props)
        this.county = 'none';
        this.data = [
          { Day: 'n/a', FirePrediction: 'n/a'},
        ]

        this.handleCountyEnter = this.handleCountyEnter.bind(this)
        this.handleCountyBoxChange = this.handleCountyBoxChange.bind(this)
    }

    handleCountyBoxChange(e){
        this.county = e.target.value
    }

    handleCountyEnter(e) {
        console.log(this.county)
        axios.post(`/api/sendCounty`, this.county)
          .then(res => {
              console.log(res);
              console.log(res.data);
          })
        // await data = getResults()
        axios.get(`/api/receiveData`)
         .then(res => {
            const persons = res.data;
            this.setState({ persons });
            this.data = res.data
         })
        this.setState({}) // force re-render
      }

    render() {
      return (
        <div className="ForecastTable">
           <h1>Forest Fire Predicting App</h1>
           <br></br>
           <br></br>
           <br></br>
           What is your county?
          <input
            type="text"
            onChange={this.handleCountyBoxChange}
          />
          <input 
            type="button"
            value="Submit"
            onClick={this.handleCountyEnter}
          /> 
        <div>
           <br></br>
           <br></br>
           <br></br>
          Forecast Table for {this.county}
          <ReactFlexyTable data={this.data}/>
        </div>
        </div>
      )
    }
}

export default ForecastTable;