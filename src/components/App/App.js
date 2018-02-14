import React from 'react';
import converter from 'hsl-to-hex';

import style from './app.scss';

import { loadGeolocation, loadWeather, loadQuote } from './LoadData';

import Drawer from './../Drawer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        city: '',
      },
      cities: [{}],
      activeCity: 0,
      weather: {
        main: {
          temp: -1,
        },
      },
      quote: {
        content: '',
        author: '',
      },
      drawerOpened: false,
      formVisible: false,
    };

    loadGeolocation(this, () => {
      loadWeather(this);
    });
    loadQuote(this, (quote) => {
      if (quote && quote.length > 0) {
        this.saveQuote({
          content: quote[0].content,
          author: quote[0].title,
        });
      }
    });
  }

  generateBackground() {
    if (this.state.weather.main.temp === -1) {
      return '#78909C';
    }
    let temp = (this.state.weather.main.temp + 20) - 273.15;
    if (temp > 40) {
      temp = 40;
    } else
    if (temp < 0) {
      temp = 0;
    }
    const hue = (80 - (temp / 40)) * 255;

    return converter(hue, 40, 50);
  }

  // Remove HTML tags and convert hex chars to ASCII
  saveQuote(quote) {
    // Temporary object
    const tmp = quote;
    // Remove HTML tags
    let content = tmp.content.replace(/<(?:.|\n)*?>/g, '');
    // Pattern to match hex character codes
    const regex = new RegExp('&#([0-9]+);', 'g');
    // Iterate over matches
    let match = regex.exec(content);
    while (match) {
      // Replace hex char code with ascii character
      content = content.replace(match[0], String.fromCharCode(match[1]));
      match = regex.exec(content);
    }

    // Set updated content
    tmp.content = content;
    this.setState({
      quote: tmp,
    });
  }

  toggleDrawer() {
    this.setState({
      drawerOpened: !this.state.drawerOpened,
      formVisible: false,
    });
  }

  hideDrawer() {
    this.setState({
      drawerOpened: false,
      formVisible: false,
    });
  }

  changeCity(index, hide = true) {
    this.setState({
      activeCity: parseInt(index, 0),
    }, () => {
      loadWeather(this, () => {
        this.setState({
          weather: this.state.cities[index].weather,
        });
      });
    });

    if (hide) {
      this.hideDrawer.bind(this)();
    }
  }

  addCity(city) {
    this.state.cities.push(city);
    this.setState({
      cities: this.state.cities,
    });
  }

  deleteCity(index) {
    this.state.cities.splice(index, 1);

    const city = this.state.activeCity === parseInt(index, 0) ?
      this.state.activeCity - 1 :
      this.state.activeCity;

    this.setState({
      cities: this.state.cities,
      activeCity: city,
    });

    this.changeCity(city, false);
  }

  render() {
    this.state.cities[0] = this.state.location;

    let wrapperClass = style.wrapper;
    wrapperClass += this.state.drawerOpened ? ` ${style.blurred}` : '';

    let shaderClass = style.shader;
    shaderClass += this.state.drawerOpened ? ` ${style.shaderVisible}` : '';

    const activeCity = this.state.cities.length > this.state.activeCity ?
      this.state.activeCity :
      0;
    const city = this.state.cities[activeCity];

    const months = [
      'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
      'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień',
    ];
    const days = [
      'niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota',
    ];
    const dateObj = new Date();
    const date = `${days[dateObj.getDay()].charAt(0).toUpperCase() + days[dateObj.getDay()].slice(1)}` +
      `, ${dateObj.getDay()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    const temp = this.state.weather.main.temp >= 0 ?
      Math.round(this.state.weather.main.temp - 273.15) :
      0;

    return (
      <div className={style.app} style={{ background: this.generateBackground.bind(this)() }}>
        <div className={shaderClass} onClick={this.hideDrawer.bind(this)} />
        <ul className={wrapperClass}>
          <li className={style.city}>{city.city}</li>
          <li className={style.tempWrapper}>
            <span className={style.temp}>
              {temp}
            </span>
            <span className={style.unit}>°C</span>
          </li>
          <li className={style.date}>
            {date}
          </li>
          <li className={style.quote}>
            <p className={style.quoteContent}>{this.state.quote.content}</p>
            <p className={style.quoteAuthor}>{this.state.quote.author}</p>
          </li>
        </ul>
        <Drawer
          cities={this.state.cities}
          activeCity={this.state.activeCity}
          formVisible={this.state.formVisible}
          onToggle={this.toggleDrawer.bind(this)}
          onChangeCity={this.changeCity.bind(this)}
          onAddCity={this.addCity.bind(this)}
          onDeleteCity={this.deleteCity.bind(this)}
          opened={this.state.drawerOpened}
          color={this.generateBackground.bind(this)()}
        />
      </div>
    );
  }
}

export default App;
