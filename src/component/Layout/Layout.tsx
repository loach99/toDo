import { Outlet } from 'react-router-dom';
import styles from './styles/Layout.module.scss';
import CreateProject from '../CreateProject/CreateProjectButton';
import Search from '../Search/Search';
const Layout = () => {
  return (
    <div>
      <div>
        <div className={styles.header}>
          <CreateProject />
          <div>
            <Search />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.sideBar}>
            <Search />
          </div>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
