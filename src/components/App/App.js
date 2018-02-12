import React from 'react';

import style from './app.scss';

import geolocation from './../../services/geolocation';
import weather from './../../services/weather';
import quotes from './../../services/quotes';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        city: 'Katowice',
      },
      weather: {
        main: {
          temp: 273.15,
        },
      },
      quote: {
        content: 'Never half-ass two things. Whole-ass one thing.',
        author: 'Ron Swanson',
      },
    };

    this.loadGeolocation.bind(this)();
    this.loadQuote.bind(this)();
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
        console.log(res);
        this.setState({
          weather: res,
        });
      },
    );
  }

  loadQuote() {
    quotes((err, quote) => {
      if (err) {
        console.error('Quote service error', err);
        return;
      }

      if (quote && quote.length > 0) {
        this.setState({
          quote: {
            content: quote[0].content.replace(/<(?:.|\n)*?>/g, ''),
            author: quote[0].title,
          },
        });
      }
    });
  }

  render() {
    return (
      <div className={style.app}>
        <div className={style.wrapper}>
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
      </div>
    );
  }
}

export default App;
