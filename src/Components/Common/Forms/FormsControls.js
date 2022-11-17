import classes from './FormsControls.module.css';

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={classes.formControls + ' ' + (hasError ? classes.error : '')}>
      <div>
        <textarea {...input} {...props}></textarea>
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};
