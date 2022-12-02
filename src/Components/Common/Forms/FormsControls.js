import { Field } from 'redux-form';
import classes from './FormsControls.module.css';

const FormControl = (props) => {
  const hasError = props.meta.touched && props.meta.error
  return (
      <div className={classes.formControls + ' ' + (hasError ? classes.error : '')}>
          {props.children}
          <div>
              {hasError && <span>{props.meta.error}</span>}
          </div>
      </div>
  )
}

export const Textarea = (props) => {
  return <FormControl {...props}><textarea {...props.input} {...props}/></FormControl>
}
export const Input = (props) => {
  return <FormControl {...props}><input {...props.input} {...props}/></FormControl>
}

export const createField = (placeholder, name, validators, component, props = {}, text = '') => (
  <div>
    <Field 
      placeholder={placeholder}
      name={name}
      validate={validators}
      component={component}
      {...props}
    /> {text}
  </div>
)

