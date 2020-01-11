import React, {Component} from 'react';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { 
  Card, CardActions, CardContent,
  Input, InputLabel, FormHelperText, FormControl,
  Button, Typography, Grid, 
} from '@material-ui/core'
import {withRouter} from "react-router-dom";
import loginStyles from '../../../../public/style/loginStyles';
import { Redirect } from 'react-router';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            isSignedIn: false
        }
    };

    handleUsernameChange = event =>{
        this.setState({username: event.target.value});
    }

    handlePasswordChange = event =>{
        this.setState({password: event.target.value});
    }

    requestLogin = () => {
        axios.post("/auth/login", {
            username: this.state.username,
            password: this.state.password
        })
        .then((res) => {
            if(res.status == 200){
                this.setState({ isSignedIn: true })
            }
        })
    }


    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        if(this.state.isSignedIn){
            return <Redirect exact to = "/"  />;
        }

        return (

        <Grid container alignItems='center' direction='row' justify='center'>
            <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: '#4b4b4b', marginTop: '0.8em', marginLeft: '0.25em'}} noWrap>
                    Registration
                </Typography>
                <Grid container alignItems='center' direction='row' justify='center'>
                <FormControl required className={classes.formControl} style={{marginBottom: '1.75em'}}>
                    <InputLabel htmlFor="name-simple">Username</InputLabel>
                    <Input id="name-simple" placeholder='Username' value={this.state.username} onChange={this.handleUsernameChange} />
                </FormControl>
                </Grid>
                <Grid container alignItems='center' direction='row' justify='center'>
                <FormControl required className={classes.formControl} style={{marginBottom: '1.75em'}}>
                    <InputLabel htmlFor="name-simple">Password</InputLabel>
                    <Input id="name-helper" placeholder='Password' value={this.state.password} onChange={this.handlePasswordChange} />
                </FormControl>
                </Grid>
                <Button fullWidth
                        variant="contained" 
                        style={{backgroundColor: '#007aff', color: "white", borderRadius: 0}} 
                        className={classes.button}
                        onClick={this.requestLogin}
                >
                    Login
                </Button>
            </CardContent>
            </Card>
        </Grid>
        );
    }
}

export default withRouter(withStyles(loginStyles)(Login));