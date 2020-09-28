import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import {submitForm} from '../redux/actions/action-creators';

import '../App.css';
class Form extends Component {
	constructor(props){
		super(props);
		console.log( " ====== FORM " , props);
		this.state = {
			fields : {
				username : ''
			}
		}
	}
	
	handleChange = (e) => {
        const {fields} = this.state;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }
	
	submitForms =(e)=> {
		e.preventDefault();
		const {fields} = this.state;
		console.log(fields)
		this.setState({
			fields:fields,
		});
	}
	  render() {
	        const { formData, onSubmitForm } = this.props;
			const {fields} = this.state;
			return(
			<div className="container">
			    <form method="post"  name="userForm" onSubmit={(e) => {e.preventDefault(); onSubmitForm(fields.username)}}>
				<p><Link to="/">Home</Link> &nbsp; 
				 {
					formData && formData.length ? <Link to="/welcome">Welcome Link</Link> : ''
				 }
				 </p>
				 <h1>{ formData || 'Hello World!'}</h1>
				 <div  className="form-group"><label for="fname"> First Name :</label> <input type="text" className="form-control" name="username" value={fields.username || ''} onChange={this.handleChange}/></div>
				 <button type="submit" className="btn btn-primary">SUBMIT</button> &nbsp; <button type="button" className="btn btn-secondary" onClick={()=> onSubmitForm('MY FORM DATA')}>Click Me</button>
				 </form>
			</div>
			)
		}
}

const mapStateToProps = state => {
console.log(state, " state ");
  return {
  formData: state.formreducer.formData
  };
};

const mapDispatchToProps = dispatch => {
  return {
   onSubmitForm: (data) => dispatch(submitForm(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form))
