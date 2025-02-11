import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { resetTaskData, setTaskData } from '../../../store/taskReducer/actions/actions';
import { closeTaskModal } from '../../../store/modalReducer/actions/actions';
import { addTask } from '../../../store/projectReducer/actions/actions';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Button from '../../Button/Button';
import { RootState } from '../../../store/store';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import styles from './styles/TaskModal.module.scss'
interface CreateTaskModalProps {
    isOpen: boolean;
    projectId?: number;
}

const CreateTaskModal = ({ isOpen, projectId }: CreateTaskModalProps) => {
    const dispatch = useDispatch();
    const { header, description, endDate, priority, status } = useSelector((state: RootState) => state.taskReducer);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        dispatch(setTaskData(e.target.name, e.target.value));
    };


    const handleSubmit = () => {
        dispatch(
            addTask({
                projectId,
                number: Date.now(),
                header,
                description,
                date: moment().format('L'),
                endDate: moment(endDate).format('L'),
                priority: priority.toLowerCase(),
                status: status.toLowerCase(),
                comments: [],
            })
        );

        dispatch(resetTaskData());
        dispatch(closeTaskModal());
    };
    const handleClose = () => {
        dispatch(closeTaskModal());
        dispatch(resetTaskData());
    };
    return (
        <ModalWrapper isOpen={isOpen} header={'Создайте задачу'} onClose={handleClose}>
            <div className={styles.modal__wrap}>
                <Input label={'Название'} placeholder={'Задача'} maxLength={20} required projectName={header} name={'header'} handleChange={handleChange} />
                <Input label={'Описание'} placeholder={'Описание'} maxLength={20} required projectName={description} name={'description'} handleChange={handleChange} />
                <Input type={'date'} label={'Дата выполнения'} placeholder={'Дата выполнения'} required projectName={endDate} name={'endDate'} handleChange={handleChange} />
                <div className={styles.select}>
                    <Select label={'Статус'} name={'status'} status={status} placeholder={'Статус'} content={status} handleChange={handleChange} options={[{ status: 'Queue' }, { status: 'Development' }, { status: 'Done' }]} selected={{ status: status.charAt(0).toUpperCase() + status.slice(1) }} />
                </div>
                <div className={styles.select}>
                    <Select label={'Приоритет'} name={'priority'} status={status} placeholder={'Приоритет'} content={status} handleChange={handleChange} options={[{ status: 'Easy' }, { status: 'Normal' }, { status: 'Hard' }]} selected={{ status: priority.charAt(0).toUpperCase() + priority.slice(1) }} />
                </div>
                <div onClick={handleSubmit}>
                    <Button content="Создать" />
                </div>
            </div>

        </ModalWrapper>
    );
};

export default CreateTaskModal;
