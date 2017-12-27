import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Base, styles} from './base'
import reqwest from 'reqwest';

export default class Login extends Base{
  submit(){
    reqwest({
      url: '/users/sign_in.json',
      method:  'POST',
      data:{
        user:{
          email: this.state.email,
          password: this.state.password,
        }
      },
      headers:{
        'X-CSRF-Token': window.TokenSocial.token
      }
    }).then(data=>{
     this.reload();
   }).catch(err=>this.handleError(err));

  }
  handleError(err){
      const errorMessage = JSON.parse(err.response).error;
      this.setState({
        error: errorMessage
      })
  }

  render(){
    return(
      <MuiThemeProvider>
        <Formsy.Form
            onValid={()=> this.enableSubmitBtn()}
            onInvalid={()=> this.disableSubmitBtn()}
            onValidSubmit={()=>this.submit()}>
            <p>{this.state.error}</p>
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
                  onChange={(e)=> this.syncField(e,"password")}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underLineStyle}
                  name="password"
                  required
                  type="password"
                  floatingLabelText="Contraseña"/>
            </div>
            <div>
              <RaisedButton
                style={styles.buttonTop}
                backgroundColor={styles.red}
                labelColor='#ffffff'
                disabled ={!this.state.canSubmit}
                type="submit"
                label="Iniciar sesión"/>
              <a href="#" onClick={this.props.toggle} style ={styles.leftSpace}>Crear Cuenta</a>


            </div>
          </Formsy.Form>

      </MuiThemeProvider>
);
  }
}
