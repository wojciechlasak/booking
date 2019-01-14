import React from "react";


class Login extends React.Component {
    render() {
      return (
          <div>
              <form method="post" role="form">  
    <input type="text" name="email"/>
    <input type="password" name="password"/>
    <button type="submit">Login</button>
</form>  
             
          </div>
      );
    }
  }
  export default Login;
  