import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { RootState } from "../../../store/store";
import { closeFileModal } from "../../../store/modalsReducer";

const ShowFile = ({file}: {file: string}) => {
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modalsReducer.showFileModal);
    if(!file) return null
    return ( 
        <ModalWrapper isOpen={modal} onClose={() => dispatch(closeFileModal())}>
            <div>
                <img src={file} alt="" />
            </div>
        </ModalWrapper>
    );
}
 
export default ShowFile;