import React from "react";
import { Button,Form, FormGroup, Input} from "reactstrap";

import "./css/Login.css";


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
            </div>
        );
    }
}
export default Login;
