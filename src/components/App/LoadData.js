import geolocation from './../../services/geolocation';
import weather from './../../services/weather';
import quotes from './../../services/quotes';

export function loadGeolocation(context, callback) {
  geolocation((err, res) => {
    if (err) {
      console.error('Geolocation service error', err);
      context.setState({
        location: {
          city: 'Warszawa',
          lat: 52.232855,
          lon: 20.9211133,
          key: new Date().getTime(),
          location: true,
        },
      }, () => {
        if (callback) {
          callback.bind(context)();
        }
      });
      return;
    }
    const loc = {
      ...res,
      key: new Date().getTime(),
      location: true,
    };
    context.setState({
      location: loc,
    }, () => {
      if (callback) {
        callback.bind(context)();
      }
    });
  });
}

export function loadWeather(context, callback) {
  weather(
    { lat: context.state.cities[context.state.activeCity].lat, lon: context.state.cities[context.state.activeCity].lon },
    (err, res) => {
      if (err) {
        console.error('Weather service error', err);
        // this.setState({
        //   weather: {}
        // });
        return;
      }
      context.setState({
        weather: res,
      });
      if (callback) {
        callback.bind(context)();
      }
    },
  );
}

export function loadQuote(context, callback) {
  quotes((err, quote) => {
    if (err) {
      console.error('Quote service error', err);
      return;
    }

    if (quote && quote.length > 0) {
      context.saveQuote({
        content: quote[0].content,
        author: quote[0].title,
      });
      if (callback) {
        callback.bind(context)();
      }
    }
  });
}

export default null;
