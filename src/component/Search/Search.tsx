import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input/Input';
import { RootState } from '../../store/store';
import { filterProject, filterTask, setFilter } from '../../store/projectReducer/actions/actions';
import { useLocation, useParams } from 'react-router-dom';

const Search = () => {
  const dispatch = useDispatch();
  const projectName = useSelector((state: RootState) => state.projectReducer.filterData);
  const { taskId } = useParams();
  const { pathname } = useLocation();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    dispatch(setFilter(e.target.value));
    if (pathname === '/') {
      setTimeout(() => {
        dispatch(filterProject(e.target.value));
      }, 300);
      return;
    }
    setTimeout(() => {
      dispatch(filterTask(e.target.value, Number(taskId)));
    }, 300);
  };
  return (
    <div>
      <Input placeholder={'Поиск...'} handleChange={handleSearch} name={'filter'} projectName={projectName} />
    </div>
  );
};

export default Search;
