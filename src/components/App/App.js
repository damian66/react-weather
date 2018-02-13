import React from 'react';
import converter from 'hsl-to-hex';

import style from './app.scss';

import geolocation from './../../services/geolocation';
import weather from './../../services/weather';
import quotes from './../../services/quotes';

import Drawer from './../Drawer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        city: 'Katowice',
      },
      cities: [],
      activeCity: -1,
      weather: {
        main: {
          temp: 273.15,
        },
      },
      quote: {
        content: 'Never half-ass two things. Whole-ass one thing.',
        author: 'Ron Swanson',
      },
      drawerOpened: true,
    };

    this.loadGeolocation.bind(this)();
    this.loadQuote.bind(this)();
  }

  generateBackground() {
    let temp = (this.state.weather.main.temp + 40) - 273.15;
    if (temp > 80) {
      temp = 80;
    } else
    if (temp < 0) {
      temp = 0;
    }
    const hue = (80 - (temp / 80)) * 255;

    return converter(hue, 40, 50);
  }

  loadGeolocation() {
    geolocation((err, res) => {
      if (err) {
        console.error('Geolocation service error', err);
        this.setState({
          location: {
            city: 'Warszawa',
            lat: 52.232855,
            lon: 20.9211133,
          },
        });
        this.loadWeather.bind(this)();
        return;
      }
      this.setState({
        location: res,
      });
      this.loadWeather.bind(this)();
    });
  }

  loadWeather() {
    weather(
      { lat: this.state.location.lat, lon: this.state.location.lon },
      (err, res) => {
        if (err) {
          console.error('Weather service error', err);
          // this.setState({
          //   weather: {}
          // });
          return;
        }
        this.setState({
          weather: res,
        });
      },
    );
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

  loadQuote() {
    quotes((err, quote) => {
      if (err) {
        console.error('Quote service error', err);
        return;
      }

      if (quote && quote.length > 0) {
        this.saveQuote({
          content: quote[0].content,
          author: quote[0].title,
        });
      }
    });
  }

  drawerToggle() {
    this.setState({
      drawerOpened: !this.state.drawerOpened,
    });
  }

  render() {
    this.state.cities[0] = this.state.location;

    let wrapperClass = style.wrapper;
    wrapperClass += this.state.drawerOpened ? ` ${style.blurred}` : '';

    let shaderClass = style.shader;
    shaderClass += this.state.drawerOpened ? ` ${style.shaderVisible}` : '';

    return (
      <div className={style.app} style={{ background: this.generateBackground.bind(this)() }}>
        <div className={shaderClass} />
        <div className={wrapperClass}>
          <div className={style.city}>{this.state.location.city}</div>
          <div className={style.tempWrapper}>
            <span className={style.temp}>
              { Math.round(this.state.weather.main.temp - 273.15)}
            </span>
            <span className={style.unit}>°C</span>
          </div>
          <div className={style.date}>
            Środa, 26 luty 2018
          </div>
          <div className={style.quote}>
            <p className={style.quoteContent}>{this.state.quote.content}</p>
            <p className={style.quoteAuthor}>{this.state.quote.author}</p>
          </div>
        </div>
        <Drawer
          cities={this.state.cities}
          activeCity={this.state.activeCity}
          onToggle={this.drawerToggle.bind(this)}
          opened={this.state.drawerOpened}
        />
      </div>
    );
  }
}

export default App;
