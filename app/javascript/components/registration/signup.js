import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Base, styles} from './base'
import reqwest from 'reqwest';

export default class SignUp extends Base{
  submit(){
    reqwest({
      url: '/users.json',
      method:  'POST',
      data:{
        user:{
          email: this.state.email,
          password: this.state.password,
          passwordConfirmation: this.state.passwordConfirmation
        }
      },
      headers:{
        'X-CSRF-Token': window.TokenSocial.token
      }
    }).then(data=>{
       this.reload();
    }).catch(err=>this.handleError(err))
  }

  handleError(err){
    console.log(err);
      const jsonError = JSON.parse(err.response);
      const errors = jsonError.errors;
      let errorsResponse = [];

      for(let key in errors){
        errorsResponse.push(<li>{errors[key]}</li>)
      }
      this.setState({
        error:errorsResponse
      })
  }

  render(){
    return(
      <MuiThemeProvider>
        <Formsy.Form
            onValid={()=> this.enableSubmitBtn()}
            onInvalid={()=> this.disableSubmitBtn()}
            onValidSubmit={()=>this.submit()}>
            <ul>{this.state.error}</ul>
            <div>
                <FormsyText
                  onChange={(e)=> this.syncField(e, "email")}
                  name="email"
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underLineStyle}
                  required
                  validations="isEmail"
                  validationError="Asegúrate de introducir un correo electrónico válido"
                  floatingLabelText="Correo electrónico"/>
            </div>
            <div>
                <FormsyText
                  onChange={(e)=> this.syncField(e, "password")}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underLineStyle}
                  name="password"
                  required
                  type="password"
                  floatingLabelText="Contraseña"/>
            </div>
            <div>
                <FormsyText
                  onChange={(e)=> this.syncField(e, "passwordConfirmation")}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underLineStyle}
                  name="password"
                  required
                  type="password"
                  floatingLabelText="Confirmar Contraseña"/>
            </div>
            <div>
              <RaisedButton
                style={styles.buttonTop}
                backgroundColor={styles.red}
                labelColor='#ffffff'
                disabled ={!this.state.canSubmit}
                type="submit"
                label="Crear Cuenta"/>
              <a href="#" onClick={this.props.toggle} style={styles.leftSpace}>Ya tengo cuenta</a>

            </div>
          </Formsy.Form>

      </MuiThemeProvider>
);
  }
}
