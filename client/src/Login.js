import React from "react";
import { Button,Form, FormGroup, Input} from "reactstrap";

import "./Login.css";


class Login extends React.Component {
    render() {
        return (
            <div className="Login">
                <Form method="post">
                    <FormGroup bsSize="large">
                        <Input
                            autoFocus
                            type="text"
                            name="nick"
                            placeholder="Nick"
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                    >
                        Login
                     </Button>
                     </Form>
                      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
            </div>
        );
    }
}
export default Login;
