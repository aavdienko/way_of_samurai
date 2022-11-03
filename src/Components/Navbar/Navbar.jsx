import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
// classes используются во избежания проблем с одинаковыми назыаниями className. Для этого в названия css файла мы добовляем .module, в import пишем improt classes from './название.modules.css. Вместо названия classes может быть все что угодно s., styles и тд.

const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to="/profile" >Profile</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" a>Messages</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/news" >News</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music" activeClassName={classes.activeLink}>Music</NavLink>
      </div>
      <div className={classes.item}>
      <NavLink to="/users" activeClassName={classes.activeLink}>Users</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="settings" activeClassName={classes.activeLink}>Settings</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
