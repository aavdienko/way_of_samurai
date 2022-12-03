import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../Utilities/validators';
import { Input } from '../Common/Forms/FormsControls';
import { login } from '../../Redux/auth-reducers';
import { Navigate } from 'react-router-dom';
import classes from '../Common/Forms/FormsControls.module.css';
import { createField } from '../Common/Forms/FormsControls';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={'Email'}
          name={'email'}
          validate={[required]}
          component={Input}
        />
      </div>
      <div>
        <Field
          placeholder={'Password'}
          name={'password'}
          type={'password'}
          validate={[required]}
          component={Input}
        />
      </div>
      <div>
        <Field
          validate={[required]}
          component={Input}
          name={'rememberMe'}
          type={'checkbox'}
        />{' '}
        Remember me
      </div>

      {props.captchaUrl && <img src={props.captchaUrl}/>}
      {props.captchaUrl && createField ('Captcha', 'captcha', [required], Input, {} )}

      { props.error &&
      <div className={classes.formSummaryError}>
        {props.error}
      </div>
      }
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };
  if (props.isAuth === true) {
    return <Navigate to={'/profile'} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
