/* eslint-disable array-callback-return */
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import { Droppable } from "../../component/DndComponents/Dropable";
import { useSelector, useDispatch } from "react-redux";
import { ITask, Priority, TaskType } from "../../types";

import { Draggable } from "../../component/DndComponents/Dragable";
import styles from "./styles/TaskPage.module.scss";
import { moveTask } from "../../store/projectReducer";
import { useParams } from "react-router-dom";
import CreateTaskModal from "../../component/Modals/CreateTaskModal/CreateTaskModal";
import ShowTaskModal from "../../component/Modals/TaskModal/ShowTaskModal";
import { RootState } from "../../store/store";

const TaskPage = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.projectReducer.projects ?? [])
        .filter((project: any) => project.id === Number(taskId))
        .flatMap((project: any) => project.tasks ?? []);
    const { taskModal, taskWindow } = useSelector((state: RootState) => state.modalsReducer);
    const taskStates: any = {
        A: tasks.filter((task: ITask) => {
            if (task) {
                return task.status === 'queue'
            }
        }),
        B: tasks.filter((task: ITask) => {
            if (task) {
                return task.status === 'development'
            }
        }),
        C: tasks.filter((task: ITask) => {
            if (task) {
                return task.status === 'done'
            }
        })
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (over) {
            const newStatus = over.id === "A" ? "queue" : over.id === "B" ? "development" : "done";
            if (taskId) {
                dispatch(moveTask(active.id, newStatus, Number(taskId)));
                if (newStatus === 'development') {

                }
            }
        }
    };
    console.log(tasks)
    const sensors = useSensor(PointerSensor, {
        activationConstraint: {
            delay: 100,
            tolerance: 5,
        }
    });
    const changePriority = (priority: Priority) => {
        return styles[`task__priority__${priority}`]
    }
    return (
        <div>
            <DndContext sensors={[sensors]} onDragEnd={handleDragEnd}>
                <div className={styles.project__state}>
                    {["A", "B", "C"].map((id) => (
                        <Droppable key={id} id={id}>
                            <div className={styles.task__state}>
                                {id === "A" ? <div>В очереди</div> : id === "B" ? <div>В работе</div> : <div>Готово!</div>}
                            </div>
                            <div className={styles.task__wrap}>
                                {taskStates[id].map((task: TaskType) => (
                                    <div key={task.number}>
                                        {!task.isFilteredOut &&
                                            <Draggable id={task.number} task={task} container={id}>
                                                <div className={styles.task}>
                                                    <div className={styles.__header}>
                                                        <div>
                                                            {task.header}
                                                        </div>
                                                        <div>
                                                            №{task.number}
                                                        </div>
                                                        <div className={styles.priority__wrap}>
                                                            <p>Приоритет: </p>
                                                            <div className={changePriority(task.priority)}>
                                                                {task.priority}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Draggable>
                                        }
                                    </div>
                                ))}
                            </div>

                        </Droppable>
                    ))}
                </div>
            </DndContext>
            {taskModal && <CreateTaskModal isOpen={taskModal} projectId={Number(taskId)} />}
            {taskWindow && <ShowTaskModal />}
        </div>
    );
};

export default TaskPage;
