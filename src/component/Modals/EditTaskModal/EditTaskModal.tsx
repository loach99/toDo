import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { closeEditModal } from '../../../store/modalReducer/actions/actions';
import { RootState } from '../../../store/store';
import Input from '../../Input/Input';
import { editTask } from '../../../store/projectReducer/actions/actions';
import { taskWindow } from '../../../store/taskReducer/actions/actions';
import moment from 'moment';
interface EditModal {
  header: string;
  description: string;
  endDate: string;
  taskId: number;
  projectId: number;
}
const EditTaskModal = ({ header, description, endDate, taskId, projectId }: EditModal) => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modalsReducer.editTaskModal);
  const data = useSelector((state: RootState) => state.taskReducer.taskWindow);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    dispatch(
      taskWindow({
        ...data,
        [e.target.name]: e.target.value
      })
    );
    dispatch(editTask(projectId, taskId, header, description, moment(endDate).format('L')));
  };
  return (
    <ModalWrapper
      isOpen={modal}
      onClose={() => {
        dispatch(closeEditModal());
      }}>
      <div>
        <Input
          label={'Название'}
          placeholder={'Задача'}
          maxLength={20}
          required
          projectName={header}
          name={'header'}
          handleChange={handleChange}
        />
        <Input
          textarea
          label={'Описание'}
          placeholder={'Описание'}
          maxLength={2000}
          required
          projectName={description}
          name={'description'}
          handleChange={handleChange}
        />
        <Input
          type={'date'}
          label={'Дата выполнения'}
          placeholder={'Дата выполнения'}
          required
          projectName={endDate}
          name={'endDate'}
          handleChange={handleChange}
        />
      </div>
    </ModalWrapper>
  );
};

export default EditTaskModal;
