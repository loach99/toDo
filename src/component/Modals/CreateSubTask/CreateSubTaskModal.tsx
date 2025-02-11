import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button/Button";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { closeSubtaskModal } from "../../../store/modalsReducer";
import { resetTaskData, setSubtaskData } from "../../../store/taskReducer";
import styles from "./styles/SubTask.module.scss";
import moment from "moment";
import { addSubTask } from "../../../store/projectReducer";
import { RootState } from "../../../store/store";
import Input from "../../Input/Input";
import Select from "../../Select/Select";
interface CreateSubtaskProps {
    isOpen: boolean
    projectId: string
    taskId: number
}
const CreateSubTaskModal = ({ isOpen, projectId, taskId }: CreateSubtaskProps) => {

    const dispatch = useDispatch();
    const { header, description, endDate, priority, status } = useSelector((state: RootState) => state.taskReducer);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        dispatch(setSubtaskData(e.target.name, e.target.value));
    };
    const handleSubmit = () => {
        const newTask = {
            number: Date.now(),
            header,
            description,
            date: moment().format('L'),
            endDate: moment(endDate).format('L'),
            priority: priority.toLowerCase(),
            status: status.toLowerCase(),
        }
        dispatch(
            addSubTask(
                taskId,
                newTask,
                Number(projectId)
            )
        );
        dispatch(closeSubtaskModal())
        dispatch(resetTaskData())
    };
    return (
        <ModalWrapper isOpen={isOpen} header={"Создайте подзадачу"} onClose={() => dispatch(closeSubtaskModal())}>
            <div className={styles.modal__wrap}>
                <Input label={"Название"} placeholder={'Подзадача'} required projectName={header} name={'header'} handleChange={handleChange} />
                <Input textarea label={"Описание"} placeholder={'Описание'} required projectName={description} name={'description'} handleChange={handleChange} />
                <Input type={'date'} label={'Дата начала'} placeholder={'Дата начала'} required projectName={endDate} name={'endDate'} handleChange={handleChange} />
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
}

export default CreateSubTaskModal;