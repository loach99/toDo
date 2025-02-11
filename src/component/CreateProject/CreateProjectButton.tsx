import { useDispatch } from 'react-redux';
import styles from './styles/Create.module.scss';
import { openProjectModal, openTaskModal } from '../../store/modalReducer/actions/actions';
import Button from '../Button/Button';
import { useLocation } from 'react-router-dom';

const CreateProjectButton = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  if (pathname === '/') {
    const openModal = (): void => {
      dispatch(openProjectModal(true));
    };
    return (
      <div className={styles.project}>
        <div onClick={openModal} className={styles.project__header}>
          <Button content={'Создать проект'} />
        </div>
      </div>
    );
  }
  if (pathname.slice(0, 5) === '/task') {
    const openModal = (): void => {
      dispatch(openTaskModal(true));
    };
    return (
      <div className={styles.project}>
        <div onClick={openModal} className={styles.project__header}>
          <Button content={'Создать задачу'} />
        </div>
      </div>
    );
  }
  return null;
};

export default CreateProjectButton;
