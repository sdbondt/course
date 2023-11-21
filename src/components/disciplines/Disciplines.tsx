import { useGetDisciplinesQuery } from '../../services/disciplineSlice'
import errorMessage from '../../utils/errorMessage';
import Discipline from './DisciplineItem';

// IDiscipline interface for the structure of a discipline document.
export interface IDiscipline {
  _id: string;
  name: string;
  slug: string;
  user: string;
}

// Disciplines component: component displayed on home page that renderse all disciplines.
const Disciplines = () => {
  // extract disciplines and state from get disciplines query
  const { data: { disciplines = [] } = {}, isLoading, isFetching, isError, error } = useGetDisciplinesQuery()

  // return loading page when loading or fetching
  if (isLoading || isFetching) return <p>loading...</p>
  return (
    <div>
      {isError && <p>{errorMessage(error)}</p>}
      {disciplines.map((discipline: IDiscipline) => <Discipline key={discipline._id} discipline={discipline} /> )}
    </div>
  )
}

export default Disciplines