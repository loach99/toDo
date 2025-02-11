import styles from './styles/Dnd.module.scss'
import { useDroppable } from '@dnd-kit/core';
interface IDropable {
  id: string
  children: React.ReactNode
}
export const Droppable = ({ id, children }:IDropable) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={isOver? styles.dropable__active: styles.dropable}
    >
      {children}
    </div>
  );
};
