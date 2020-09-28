import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import {getDogsData} from '../redux/actions/action-creators';
import '../App.css';
class Dog extends Component {
	constructor(props){
		super(props);
		console.log( " ====== DOGS " , props);
	}
	  render() {
	  const { fetching, dog, onRequestDog, error } = this.props;
	  const style = {
		width: '350px', 'height': '300px'
	  }
			return(
			<>
				<div className="jumbotron jumbotron-fluid">
					<div className="container">
						 <div className="row">
						  <div className="col-sm-10 col-md-10"><h1>Welcome to Dog Saga App</h1></div>
						  <div className="col-sm-2 col-md-2"><Link to="/">Home</Link></div>
						</div> 
						<div className="row">
							<div className="col-sm-12 col-md-12"><p>Example to show how to use Redux Saga </p></div>
						 </div>
					</div>
				</div>
				<div className="container">				
					{
						dog  ? <div> <img src={dog} className="img-fluid mx-auto d-block" style={style}  />	 </div> : null
					}
					{
						dog ? <p className="font-weight-bold text-center">Keep clicking for new dogs</p> :  <p className="font-weight-bold text-center">Replace the React icon with a dog!</p> 
					}

					{
						fetching ? <button disabled className="btn btn-primary mx-auto d-block">Fetching...</button> : <button className="btn btn-primary mx-auto d-block" onClick={onRequestDog}>Request a Dog</button>
					}

					{ 
						error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>
					}

				</div>
			</>
			)
		}
}

const mapStateToProps = state => {
console.log(state, " state ");
  return {
  fetching: state.dogreducer.fetching,
  dog: state.dogreducer.dog,
  error: state.dogreducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
   onRequestDog: () => dispatch(getDogsData())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dog))

