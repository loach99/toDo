import { createPortal } from 'react-dom';
import styles from './styles/ModalWrapper.module.scss';

interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    header?: string
}

const modalRoot = document.getElementById('modal') || document.body;

const ModalWrapper = ({ isOpen, onClose, children, header }: ModalWrapperProps) => {
    if (!isOpen) return null;

    return createPortal(
        <div className={styles.modal__wrap}>
            <div className={styles.modal__content}>
                <div className={styles.closeButton} >
                    <h3>{header}</h3>
                    <button onClick={onClose}></button>
                </div>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default ModalWrapper;
