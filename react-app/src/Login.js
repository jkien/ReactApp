import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import graph from 'fb-react-sdk';

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
    
    graph.setAccessToken(this.state.fbUser.accessToken);
    //graph.get(this.state.fbUser.id + '/friendlists', function(err, res) {
    //this is another way to call graph api, already have this info in facebook login call response
    graph.get('/me/friends', function(err, res) {
      console.log('getting friends list with graph api:');
      console.log(res); // { id: '4', name: 'Mark Zuckerberg'... } 
      console.log(err);
    });
  }

  render = () => (
    <div className="login">
      <FacebookLogin
        appId="1126658334110806"
        autoLoad={true}
        fields="name,email,picture,friends"
        scope="public_profile,user_friends,user_actions.books"
        callback={this.responseFacebook} />
        <br/><br/>
      <div>
        {!!(this.state.fbUser) &&
          <div>
            <div>{this.state.fbUser.name}</div>
            {!!(this.state.fbUser.picture) &&
              <img src={this.state.fbUser.picture.data.url} />
            }
            {!!(this.state.fbUser.friends) &&
              <div>
                <div>You have {this.state.fbUser.friends.summary.total_count} friends.</div>
                <div>{this.state.fbUser.friends.data.length} are using this app.</div>
              </div>
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