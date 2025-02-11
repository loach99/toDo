import { useDispatch, useSelector } from 'react-redux';
import { addProject, changeInput, clearInput } from '../../../store/projectReducer/actions/actions';
import { closeProjectModal } from '../../../store/modalReducer/actions/actions';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import { RootState } from '../../../store/store';
import moment from 'moment';
import { UploadButton } from '@bytescale/upload-widget-react';
import { useState } from 'react';
import styles from './styles/CreateProjectModal.module.scss';
const CreateProjectModal = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useDispatch();
  const { name, description } = useSelector((state: RootState) => state.projectReducer);
  const [files, setFiles] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    dispatch(changeInput(e.target.name, e.target.value));
  };

  const handleSubmit = () => {
    if (!name) return;
    dispatch(
      addProject({
        id: Date.now(),
        name: name,
        description: description,
        dateCreate: moment().format('L'),
        files,
        tasks: []
      })
    );
    dispatch(clearInput());
    dispatch(closeProjectModal());
  };
  const options = {
    apiKey: 'public_223k24Q4Y3sYtyFcifUAJXusX95Y',
    maxFileCount: 1
  };
  const handleClose = () => {
    dispatch(closeProjectModal());
    dispatch(clearInput());
  };
  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <h2>Создайте проект</h2>
      <Input
        label={'Название'}
        placeholder={'Проект'}
        maxLength={20}
        required
        projectName={name}
        name={'name'}
        handleChange={handleChange}
      />
      <Input
        label={'Описание'}
        placeholder={'Описание'}
        maxLength={20}
        required
        projectName={description}
        name={'description'}
        handleChange={handleChange}
      />
      <UploadButton options={options} onComplete={(files) => setFiles(files.map((x) => x.fileUrl).join('\n'))}>
        {({ onClick }) => (
          <div className={styles.upload__btn} onClick={onClick}>
            <Button isSend content={'Загрузить изображение'} />
          </div>
        )}
      </UploadButton>
      <div onClick={handleSubmit}>
        <Button content="Создать" />
      </div>
    </ModalWrapper>
  );
};

export default CreateProjectModal;
