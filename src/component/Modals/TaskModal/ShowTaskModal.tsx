import { useDispatch } from 'react-redux';
import Task from '../../Task/Task';
import styles from './styles/TaskModal.module.scss';
import { closeTaskWindow } from '../../../store/modalReducer/actions/actions';

const ShowTaskModal = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.modal__wrap}>
      <div>
        <button onClick={() => dispatch(closeTaskWindow())}></button>
        <Task />
      </div>
    </div>
  );
};

export default ShowTaskModal;
