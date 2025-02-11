import styles from './styles/CommentInput.module.scss'
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/projectReducer/actions/actions";
import Button from "../Button/Button";
import { useParams } from 'react-router-dom';
import { UploadButton } from '@bytescale/upload-widget-react';
interface Input {
    taskNumber: number
    parentCommentId: number | null
    inputId?: number | null
    setInputId: React.Dispatch<React.SetStateAction<number | null>>
}
const CommentInput = ({ taskNumber, parentCommentId, setInputId, inputId }: Input) => {
    const [comment, setComment] = useState<string>("");
    const dispatch = useDispatch();
    const projectId = useParams();
    const [files, setFiles] = useState<string[]>(['']);
    const handleAddTask = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!comment) return;
        dispatch(addComment(taskNumber, parentCommentId, comment, Number(projectId.taskId), files));
        setComment("");
        setInputId(null);
    };
    const options = {
        apiKey: "public_223k24Q4Y3sYtyFcifUAJXusX95Y",
        maxFileCount: 5
    };

    return (
        <div>
            <div className={styles.comment__btn}>
                <div onClick={() => setInputId(parentCommentId)}>
                    <Button isComment />
                </div>
                <Button isLike />
            </div>
            {inputId === parentCommentId && (
                <div className={styles.comment}>
                    <form onSubmit={handleAddTask}>
                        <div className={styles.comment__input}>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Введите комментарий..."
                            />
                            <div className={styles.comment__files}>
                                {files.map((file: string) => {
                                    if (!file) return null
                                    return (
                                        <div className={styles.comment__file} key={file}>
                                            <img src={file} alt="file" />
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className={styles.comment__btn__wrapper}>
                            <div onClick={() => setInputId(0)}>
                                <Button isClose content={'Закрыть'} />
                            </div>
                            <Button isSend content={'Отправить'} type="submit" />
                            <UploadButton
                                options={options}
                                onComplete={files => setFiles(files.map(x => x.fileUrl))}>
                                {({ onClick }) =>
                                    <div onClick={onClick}>
                                        <Button isSend content={'Загрузить'} />
                                    </div>
                                }
                            </UploadButton>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CommentInput;
