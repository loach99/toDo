import { useRef } from "react";
import styles from './styles/Accordion.module.scss'
import Select from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { TaskType, ProjectType, SubTask } from "../../types";
import { useParams } from "react-router-dom";
import { mockStatus } from "../../__mock__";
import { RootState } from "../../store/store";
import { moveSubTask } from "../../store/projectReducer/actions/actions";
interface IAccordionItem {
    item: {
        header: string,
        description: string
    }
    onClick: () => void
    isOpen: boolean
    subTaskId: number
    subtask: SubTask
}
export const AccordionItem = ({ item, onClick, isOpen, subTaskId, subtask }: IAccordionItem) => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const { number } = useSelector((state: RootState) => state.taskReducer.taskWindow);
    const status = useSelector((state: RootState) => state.projectReducer.projects)
        .filter((project: ProjectType) => project.id === Number(taskId))
        .flatMap((project: ProjectType) => project.tasks)
        .filter((task: TaskType) => task.number === number)[0].subtasks
        .filter((subtask: SubTask) => subtask.number === subTaskId)[0].status;

    const handleStatusSelect = (value: string) => {
        if (taskId) {
            dispatch(moveSubTask(number, value, Number(taskId), subTaskId))
        }
    };
    const selectedStatus = mockStatus.find((item) => item.status === status);

    const itemRef = useRef<null | HTMLDivElement>(null);
    return (
        <li className={styles.accordion__item}>
            <button className={styles.accordion__header} onClick={() => onClick()}>
                {subtask.header}
                <div>
                    {subtask.date}
                </div>
            </button>
            <div
                className={styles.accordion__collapse}
                style={
                    isOpen && itemRef.current ? { height: itemRef.current.scrollHeight } : { height: "0px" }
                }
            >
                <div className={styles.accordion__body} ref={itemRef}>
                    <div>
                        <div className={styles.accordion__select}>
                            <Select
                                noArrow
                                status={status}
                                content={status}
                                onChange={handleStatusSelect}
                                options={mockStatus}
                                selected={selectedStatus} />
                        </div>
                        <div>
                            {subtask.description}
                        </div>
                    </div>
                    <div>
                        Выполнить до: {subtask.endDate}
                    </div>
                </div>
            </div>
        </li>
    );
};