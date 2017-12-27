import React from 'react';
import WebpackerReact from 'webpacker-react';
import  Login  from 'components/registration/login';
import  SignUp  from 'components/registration/signup';
class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showLogin: false
    }
    this.toggle= this.toggle.bind(this)
  }
  toggle(e){
      e.preventDefault();
      this.setState({
        showLogin: !this.state.showLogin
      })
  }
  render(){
      return( <div>
        {this.state.showLogin ? <Login toggle={this.toggle}/> : <SignUp toggle={this.toggle}/> }
         </div>);
  }
}
WebpackerReact.setup({Registration})
