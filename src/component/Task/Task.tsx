import CommentInput from "../Comment/CommentInput";
import styles from "./styles/Task.module.scss";
import CommentBlock from "../CommentBlock/CommentBlock";
import { ITask, Priority } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Select from "../Select/Select";
import { mockStatus } from "../../__mock__";
import { moveTask } from "../../store/projectReducer";
import SubTaskBlock from "../SubTaskBlock/SubTaskBlock";
import Button from "../Button/Button";
import CreateSubTaskModal from "../Modals/CreateSubTask/CreateSubTaskModal";
import { RootState } from "../../store/store";
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal";
import { openEditModal } from "../../store/modalsReducer";

const Task = () => {

    const [inputId, setInputId] = useState<number | null>(0);
    const dispatch = useDispatch();
    const changePriority = (priority: Priority) => {
        return styles[`task__priority__${priority}`]
    }
    const { taskId } = useParams();
    const { number, header, description, date, priority, endDate } = useSelector((state: RootState) => state.taskReducer.taskWindow);
    const status = useSelector((state: RootState) => state.projectReducer.projects)
        .filter((project: any) => project.id === Number(taskId))
        .map((project: any) => project.tasks
            .filter((task: ITask) => task.number === number)[0].status)[0];
    const subTaskModal = useSelector((state: RootState) => state.modalsReducer.subTaskModal);
    const handleStatusSelect = (value: string) => {
        if (taskId) {
            dispatch(moveTask(number, value, Number(taskId)))
        }
    };
    const selectedStatus = mockStatus.find((item) => item.status === status);
    const tasks = useSelector((state: RootState) => state.projectReducer.projects).filter((project: any) => project.id === Number(taskId)).map((project: any) => {
        if (!project.tasks) {
            return project
        }
        return project.tasks.filter((task: ITask) => task.number === number)
    });

    return (
        <div className={styles.task}>
            <div className={styles.task__header}>
                <div className={styles.task__priority__widget}>
                    <div className={changePriority(priority)}>
                        {priority}
                    </div>
                    <Button addTask content={'Добавить подзадачу'} />
                    <div onClick={() => dispatch(openEditModal(true))}>
                        <Button edit content={'Редактировать'} />
                    </div>
                </div>
                <div>
                    <div className={styles.task__header__info}>
                        <div>
                            <div className={styles.task__header__name}>
                                {header}
                            </div>
                            <div className={styles.task__header__created}>
                                {date}
                            </div>
                            <div>
                                №{number}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className={styles.task__endDate}>Выполнить до: {endDate}</div>
            <div className={styles.task__description}>
                <div>
                    <h1>{header}</h1>
                    <Select noArrow status={status} content={status} onChange={handleStatusSelect} options={mockStatus} selected={selectedStatus} />
                </div>
                <div>
                    <div>
                        {description}
                    </div>
                </div>
                {subTaskModal && <CreateSubTaskModal taskId={number} projectId={taskId ?? ""} isOpen={subTaskModal} />}
                <SubTaskBlock taskId={number} projectId={Number(taskId)} />
                <EditTaskModal projectId={Number(taskId)} taskId={number} header={header} description={description} endDate={endDate} />
            </div>
            <div className={styles.task__comments}>
                <div>
                    <CommentInput setInputId={setInputId} inputId={inputId} taskNumber={number} parentCommentId={null} />
                    <CommentBlock setInputId={setInputId} inputId={inputId} taskNumber={number} files={tasks.flat()[0].files} comments={tasks.flat()[0].comments} />
                </div>
            </div>
        </div>

    );
};

export default Task;
