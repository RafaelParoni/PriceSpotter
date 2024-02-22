import './Home.css';

import { freeGamelist } from '../../Components/Epic Games/freeGameList';


import NavbarComp from '../../Components/Navbar/Navbar';

function HomePage() {

  freeGamelist().then(function(result){
    console.log(result)
  })

  return (
    <>
      <NavbarComp/>
      <div className="Home">
        
      </div>
    </>
  );
}

export default HomePage;
