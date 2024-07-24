import React from 'react';
import BeansList from '../components/BeansList';
import './Home.css';

const Home = () => {

  useEffect(() => {
    document.title = "Mikuurrs Coffee Shop";
  }, []);

  return (
    <div className="background">
      <BeansList />
    </div>
  )
};

export default Home;