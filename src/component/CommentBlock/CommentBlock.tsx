import CommentInput from "../Comment/CommentInput";
import { Comments } from "../../types";
import styles from './styles/CommentBlock.module.scss'
import { useDispatch } from "react-redux";
import { openFileModal } from "../../store/modalReducer/actions/actions";
import ShowFile from "../Modals/ShowFile/ShowFile";
import { useState } from "react";
interface IComment {
    comments: Comments[]
    files: string[]
    taskNumber: number
    inputId?: number | null
    setInputId: React.Dispatch<React.SetStateAction<number | null>>
}

const CommentBlock = ({ comments, taskNumber, setInputId, inputId, files }: IComment) => {
    const [file, setFile] = useState<string>('');
    const dispatch = useDispatch();
    if (comments.length === 0) return null;
   
    const handleShowFile = (file: string) => {
        setFile(file)
        dispatch(openFileModal(true))
    }
   
    return (
        <div className={styles.comments}>
            {comments.map((comment: Comments) => (
                <div key={comment.id}>
                    <div>
                        <div>
                            <div className={styles.comments__author}></div>
                            <div>Name Name</div>
                        </div>
                        <div>{comment.text}</div>
                        {comment.files?.map((file) => (
                            <div onClick={()=> handleShowFile(file)} className={styles.comments__file} key={file}>
                                <img src={file} alt="" />
                            </div>))}
                    </div>
                    <CommentInput
                        taskNumber={taskNumber}
                        parentCommentId={comment.id}
                        inputId={inputId}
                        setInputId={setInputId}
                    />
                    {comment.comments.length > 0 && (
                        <CommentBlock
                            taskNumber={taskNumber}
                            files={comment.files}
                            comments={comment.comments}
                            inputId={inputId}
                            setInputId={setInputId}
                        />
                    )}
                </div>
            ))}
            <ShowFile file={file}/>
        </div>
    );
};

export default CommentBlock;
