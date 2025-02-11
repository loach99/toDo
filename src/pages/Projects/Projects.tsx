import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/Projects.module.scss';
import { useNavigate } from 'react-router-dom';
import CreateProjectModal from '../../component/Modals/CreateProjectModal/CreateProjectModal';
import { RootState } from '../../store/store';
import Button from '../../component/Button/Button';
import { deleteProject } from '../../store/projectReducer/actions/actions';

const Projects = () => {
    const projects = useSelector((state: RootState) => state.projectReducer.projects);
    const modal = useSelector((state: RootState) => state.modalsReducer.projectModal);
    const naviagate = useNavigate();
    const dispatch = useDispatch();
    if (!projects) return null
    return (
        <div>
            <div className={styles.projects__wrap}>
                {projects?.map((project: any) =>
                    <div key={project.id}>
                        <div onClick={() => dispatch(deleteProject(project.id))} className={styles.project__btn__delete}>
                        {!project.isFilteredOut &&
                            <Button deleteBtn />}
                        </div>
                        {!project.isFilteredOut &&
                            <div onClick={() => naviagate(`/task/${project.id}`, { state: { ...project } })} key={project.id} className={styles.project}>
                                <div className={styles.project__image}>
                                    <img src={project.files} alt="" />
                                </div>
                                <div onClick={() => naviagate(`/task/${project.id}`, { state: { ...project } })} className={styles.project__header}>
                                    <div>{project.dateCreate}</div>
                                    <div>{project.name}</div>
                                    <div>{project.description ? project.description : 'Have a nice day :)'}</div>
                                </div>
                            </div>}
                    </div>
                )}
            </div>
            {modal && <CreateProjectModal isOpen={modal} />}
        </div>
    );
}

export default Projects;