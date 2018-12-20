import React from 'react'
import Titles from './component/title'
import Form from './component/form'
import Weather from './component/weather'


const API_KEY="b6907d289e10d714a6e88b30761fae22";


class App extends React.Component{

  state={
    temperature:undefined,
    city:undefined,
    country:undefined,
    humidity:undefined,
    descritpion:undefined,
    error:undefined
  }
 
  getWeather = async (e) => {
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    const api_call=await fetch(`https://openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data=await api_call.json();

    try{
    if(city && country)
    {
    console.log(data);
    this.setState({
      temperature:data.main.temp,
      city: data.name,
      country:data.sys.country,
      humidity:data.main.humidity,
      descritpion:data.weather[0].description,
      error:""
    });
  }
  else{
    this.setState({
      error:"Please enter the value."
    });    
  }
}
catch (e) {
  console.log('error',e);
}
}
 render(){

  return(
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
              <Titles/>
              </div>
              <div className="col-xs-7 form-container">
              <Form getWeather={this.getWeather}/>
                <Weather temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.descritpion}
                error={this.state.error} 
                />

              </div>



            </div>

          </div>
        </div>
        </div>  
      
      </div>
  );
 }

};



     
export default App;