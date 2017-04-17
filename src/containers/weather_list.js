import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  constructor(props) {
    super(props);
    this.renderWeather = this.renderWeather.bind(this);
  }

  renderWeather(cityData) { 
    const cityName = cityData.city.name;
    const temperatureData = cityData.list.map(weather => weather.main.temp);
    const pressureData = cityData.list.map(weather => weather.main.pressure);
    const humidityData = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    console.log('temperatureData', temperatureData);
    console.log('pressureData', pressureData);
    console.log('humidityData', humidityData);
    return (
      <tr key={cityName}>
        <td>
          {/*<GoogleMap lon={lon} lat={lat}/>*/}
          {cityName}
        </td>
        <td>
          <Chart data={temperatureData} color='red' units='K' />
        </td>
        <td>
          <Chart data={pressureData} color='purple' units='hPa'/>
        </td>
        <td>
          <Chart data={humidityData} color='black' units='%'/>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({weather}) {
  return {
    weather
  }
}

export default connect(mapStateToProps)(WeatherList);