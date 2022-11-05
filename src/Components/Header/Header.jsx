import { NavLink } from 'react-router-dom';
import classes from './Header.module.css'

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img src="https://play-lh.googleusercontent.com/ahJtMe0vfOlAu1XJVQ6rcaGrQBgtrEZQefHy7SXB7jpijKhu1Kkox90XDuH8RmcBOXNn"></img>

      <div className={classes.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}

      </div>
    </header>
  );
};

export default Header;
