import React from 'react';
import WeatherWidget from '@/component/compo-weather/page'
import Humidity from '@/component/compo-weather/page';

const Home = () => {
  return (
    <div>
      <WeatherWidget />
      <Humidity/>
    </div>
  );
};

export default Home;
