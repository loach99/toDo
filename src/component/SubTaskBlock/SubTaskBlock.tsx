import { useSelector } from 'react-redux';
import styles from './styles/SubTaskBlock.module.scss';
import { ProjectType, SubTask } from '../../types';
import { Accordion } from '../Accordion/Accordion';
import { RootState } from '../../store/store';
interface ISubTaskProps {
  taskId: number;
  projectId: number;
}
const SubTaskBlock = ({ taskId, projectId }: ISubTaskProps) => {
  const subTask = useSelector((state: RootState) => state.projectReducer.projects)
    .filter((project: ProjectType) => project.id === projectId)
    .flatMap((project: ProjectType) => project.tasks)
    .filter((task: SubTask) => task.number === taskId)[0].subtasks;
  if (!subTask) return null;

  return (
    <div className={styles.task__subtasks}>
      <h2>Подзадачи</h2>
      <div>
        {subTask
          .filter((subtask: SubTask) => subtask !== undefined)
          .map((subtask: SubTask) => {
            return (
              <Accordion
                key={subtask.number}
                subtask={subtask}
                subTaskId={subtask.number}
                list={[
                  {
                    header: subtask.header,
                    description: subtask.description
                  }
                ]}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SubTaskBlock;
