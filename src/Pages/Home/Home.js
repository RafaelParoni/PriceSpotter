import './Home.css';

import { freeGamelist } from '../../Components/Epic Games/freeGameList';



function HomePage() {

  freeGamelist().then(function(result){
    console.log(result)
  })

  return (
    <>
      <div className="Home">
        
      </div>
    </>
  );
}

export default HomePage;
