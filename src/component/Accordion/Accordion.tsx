import { useState } from "react";
import { AccordionItem } from "./AccordionItem";
import styles from './styles/Accordion.module.scss'
import { SubTask } from "../../types";

interface IAccordion {
    list: {
        header: string;
        description: string;
    }[];
    subTaskId: number
    subtask: SubTask
}
export const Accordion = ({ list, subtask, subTaskId }: IAccordion) => {
  const [openId, setId] = useState<null | number>(null);
  return (
    <ul className={styles.accordion}>
      {list.map((item, id) => {
        return (
          <AccordionItem
            subTaskId={subTaskId}
            subtask={subtask}
            onClick={() => (id === openId ? setId(null) : setId(id))}
            item={item}
            isOpen={id === openId}
            key={id}
          />
        );
      })}
    </ul>
  );
};