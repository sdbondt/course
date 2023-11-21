import React from 'react'
import { IDiscipline } from './Disciplines'
import { Link } from 'react-router-dom';

// Interface for the discipline props passed to the item.
interface DisciplineProps {
    discipline: IDiscipline;
}

// Discipline component: display single discipline in disciplines component
// Receive single discipline as a prop
const Discipline: React.FC<DisciplineProps> = ({ discipline: { name, slug }}) => {
  return (
      <div>
      <Link to={`/disciplines/${slug}`}>{ name }</Link>
    </div>
  )
}

export default Discipline