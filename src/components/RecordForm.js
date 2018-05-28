import React,{Component}from 'react'
import * as RecordsAPI from '../utils/RecordsAPI';

class RecordForm extends Component{
    constructor(props){
        super(props);
        this.state=({
            date:"",
            title:"",
            amount:""
        });
    }
    handlerChange(event)
    {
        let name,obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj[""+name]= event.target.value,
            obj
        ));

    }
    valid(){
        return this.state.date && this.state.title && this.state.amount;
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            date: this.state.date,
            title: this.state.title,
            amount: parseInt(this.state.amount, 0)
        }
        RecordsAPI.create(data).then(
            response => {
                this.props.handleNewRecord(response.data)
                this.setState({
                    date:"",
                    title:"",
                    amount:""
                });
            }
        ).catch(
            error => console.log(error.message)
        );
    }
    render(){
        return(
           <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
             <div  className="form-group mr-1">
                 <input type="text" onChange={this.handlerChange.bind(this)} className="form-control" placeholder="Date" name="date" value={this.state.date}/>
             </div>
               <div  className="form-group mr-1">
                   <input type="text" onChange={this.handlerChange.bind(this)}  className="form-control" placeholder="Title" name="title" value={this.state.title}/>
               </div>
               <div  className="form-group mr-1">
                   <input type="text" onChange={this.handlerChange.bind(this)}  className="form-control" placeholder="amount" name="amount" value={this.state.amount}/>
               </div>
               <button type="submit" className="btn btn-primary" disabled={!this.valid()}>create record</button>
           </form>
        )
    };
}
/*RecordForm.propTypes  ={
    id:PropTypes.string,
    date:PropTypes.string,
    title:PropTypes.string,
    amount:PropTypes.number

}*/
export default RecordForm;