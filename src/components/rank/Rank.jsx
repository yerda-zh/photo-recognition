import brain from './icon.png';
import './rank.scss';

const Rank = ({name, entries}) => {
  return (
    <div className='RankContainer'>

      <div className='LogoDiv'>
          <img src={brain} alt='brain'/>
      </div>

      <div className='RankDiv'>
        <h1>
            {`${name}, your current entry count is...`}
        </h1>
        <p>
            {entries}
        </p>
      </div>
      
    </div>
    
  )
}

export default Rank