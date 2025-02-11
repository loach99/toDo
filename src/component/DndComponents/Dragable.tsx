import { useDraggable } from '@dnd-kit/core';
import { openTaskWindow } from '../../store/modalReducer/actions/actions';
import { taskWindow } from '../../store/taskReducer/actions/actions';
import { TaskType } from '../../types';
import { useDispatch } from 'react-redux';
import styles from './styles/Dnd.module.scss'
interface IDragable {
    id: number
    container: string
    task: TaskType
    children: React.ReactNode
}
export const Draggable = ({ id, children, container, task }: IDragable) => {

    const dispatch = useDispatch();
    const showTask = (task: TaskType): void => {
        dispatch(openTaskWindow(true));
        dispatch(taskWindow(task))
    }
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: { container }
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    return (
        <div
            ref={setNodeRef}
            onClick={() => showTask(task)}
            {...listeners}
            {...attributes}
            className={styles.dragable}
            style={style}
        >
            {children}
        </div>
    );
};