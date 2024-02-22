import './Home.css';

import { freeGamelist } from '../../Components/Epic Games/freeGameList';

function HomePage() {

  freeGamelist().then(function(result){
    console.log(result)
  })

  return (
    <div className="App">
      <header className="App-header">
       <h1>Home</h1>
      </header>
    </div>
  );
}

export default HomePage;
