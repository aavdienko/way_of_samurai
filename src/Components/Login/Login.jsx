import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../Utilities/validators";
import { Input } from "../Common/Forms/FormsControls";
import { login } from "../../Redux/auth-reducers";


const LoginForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field placeholder={'Login'} name={'login'} validate={[required]} component={Input} />
        </div>
        <div>
          <Field placeholder={'Password'} name={'password'} type={'password'} validate={[required]} component={Input}/>
        </div>
        <div>
          <Field validate={[required]} component={Input} name={'rememberMe'} type={'checkbox'} /> Remember me
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
  );
};

const LoginReduxForm = reduxForm ({
  form: 'Login'
})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  );
};

export default connect(null, {login})(Login);
