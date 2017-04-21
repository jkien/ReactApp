import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

import { connect } from 'react-redux'

//const responseFacebook = (response) => {
//  console.log(response);
//}

export class Login extends Component { 
  constructor() {
    super();
    this.state = { 
      fbUser: {},
    }
    console.log("end constructor");
  }

  responseFacebook = (response) => {
    console.log("response call");
    console.log(response);
    this.setState( {fbUser: response});
    console.log("state:");
    console.log(this.state);
  }

  render = () => (
    <div className="login">
      <FacebookLogin
        appId="1126658334110806"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook} />
        <br/><br/>
      <div>
        {!!(this.state.fbUser) &&
          <div>
            {this.state.fbUser.name}
            {!!(this.state.fbUser.picture) &&
              <img src={this.state.fbUser.picture.data.url} />
            }
          </div>
        }
        
        
      </div>
    </div>
  )
}


Login.defaultProps = {
};

const mapStateToProps = (state, ownProps) => {
  return { 
  }
}

const mapDispatchToProps = {
}

export default Login //connect(mapStateToProps, mapDispatchToProps)(Login);