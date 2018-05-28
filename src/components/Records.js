import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm'
import * as RecordsAPI from '../utils/RecordsAPI'

class Records extends Component{
    constructor()
    {
        super();
        this.state ={
            records:[],
            error:null,
            isLoaded:false
        }
    }
    componentDidMount()
    {
        RecordsAPI.getAll().then(
            response => this.setState({
                isLoaded:true,
                records:response.data
            })
        ).catch(
            error => this.setState({
                isLoaded:true,
                error
            })
        );
    }
    addNewRecord(record)
    {
        this.setState({
            error:null,
            isLoaded:true,
            records:[
                ...this.state.records,
                record
            ]
        });
    }
    render()
    {
        const {error,isLoaded,records} = this.state;
        let recordsComponent;
        if(error){
            recordsComponent =  <div>error.responseText</div>;
        }else if(!isLoaded){
            recordsComponent = <div>Loading</div>
        }else {
            recordsComponent=(
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {records.map((record)=> <Record key={record.id} {...record} />)}
                        </tbody>
                    </table>

            )
        }
        return (
            <div>
                <h2>Records</h2>
                <RecordForm handleNewRecord={this.addNewRecord.bind(this)}/>
                {recordsComponent}
            </div>
        )
    }
}
export default Records;