import { useDispatch } from 'react-redux'
import styles from '../Button/styles/Button.module.scss'
import { openSubtaskModal } from '../../store/modalReducer/actions/actions'

interface ButtonProps {
    content?: string
    isComment?: boolean
    setActiveComment?: (value: boolean) => void
    isLike?: boolean
    isSend?: boolean
    isClose?: boolean
    type?: string
    setInputId?: React.Dispatch<React.SetStateAction<number>>
    addTask?: boolean
    status?: string
    addSubTask?: boolean
    edit?: boolean
    deleteBtn?: boolean
}

const Button = ({ content, isComment, setActiveComment, isLike, isSend, isClose, addTask, status, addSubTask, edit, deleteBtn }: ButtonProps) => {
    const changeStatus = (status: string) => {
        return styles[`status__${status}`]
    }
    const dispatch = useDispatch();
    if (isComment) {
        return (
            <div>
                <button onClick={() => setActiveComment && setActiveComment(true)} className={styles.btn__comment}>

                </button>
            </div>
        )
    }
    if (isLike) {
        return (
            <div>
                <button className={styles.btn__like}>

                </button>
            </div>
        )
    }
    if (isSend) {
        return (
            <div>
                <button type='submit' className={styles.btn__send}>
                    {content}
                </button>
            </div>
        )
    }
    if (isClose) {
        return (
            <div>
                <button onClick={() => setActiveComment && setActiveComment(false)} type='button' className={styles.btn__close}>
                    {content}
                </button>
            </div>
        )
    }
    if (addTask) {
        return (
            <div>
                <button onClick={() => dispatch(openSubtaskModal(true))} className={styles.addTask}>
                    {content}
                </button>
            </div>
        )
    }
    if (addSubTask) {
        return (
            <div>
                <button className={styles.addTask}>
                    {content}
                </button>
            </div>
        )
    }
    if (status) {
        return (
            <div>
                <button className={changeStatus(status)}>
                    {content}
                </button>
            </div>
        );
    }
    if (edit) {
        return (
            <div>
                <button className={styles.edit}>
                    {content}
                </button>
            </div>
        )
    }
    if (deleteBtn) {
        return (
            <div>
                <button className={styles.deleteBtn}>x</button>
            </div>
        )
    }
    return (
        <div>
            <button className={styles.squishy__neon}>
                {content}
            </button>
        </div>
    );
}

export default Button;