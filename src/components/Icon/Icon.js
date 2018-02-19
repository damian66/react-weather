import React from 'react';

import style from './icon.scss';

class Icon extends React.Component {
  static generate(className, amount = 0, styles = []) {
    const divs = [];
    const rect = { width: 10, height: 10 };
    const columnWidth = rect.width / amount;

    for (let i = 0; i < amount; i += 1) {
      const divStyle = {};

      if (styles.indexOf('left') >= 0) {
        divStyle.left = `${(Math.random() * columnWidth) + (columnWidth * i)}em`;
      }
      if (styles.indexOf('top') >= 0) {
        divStyle.top = `${Math.random() * (rect.height / 1.5)}em`;
      }
      if (styles.indexOf('animation-delay') >= 0) {
        divStyle.animationDelay = `${Math.round(Math.random() * 100) / 100}s`;
      }

      const key = i;

      divs.push((
        <div
          key={key}
          style={divStyle}
        />
      ));
    }

    return (
      <div className={className}>
        {divs}
      </div>
    );
  }

  static sun() {
    return Icon.generate(style.sun);
    // return (
    //   <div className={style.sun} />
    // );
  }

  static moon() {
    return Icon.generate(style.moon, 4);
  }

  static rain() {
    return Icon.generate(style.rain, 30, ['top', 'left', 'animation-delay']);
  }

  static snow() {
    return Icon.generate(style.snow, 30, ['top', 'left', 'animation-delay']);
  }

  render() {
    let icon = '';

    if (this.props.weather && this.props.weather.sys) {
      icon = Icon.sun();

      const currentDate = new Date();
      // Need to multiply sunrise time to convert UNIX timestamp to javascript time
      if (currentDate < this.props.weather.sys.sunrise * 1000 ||
          currentDate > this.props.weather.sys.sunset * 1000) {
        icon = Icon.moon();
      }

      if (this.props.weather.weather[0].main.toLowerCase().indexOf('rain') >= 0) {
        icon = Icon.rain();
      }

      if (this.props.weather.weather[0].main.toLowerCase().indexOf('snow') >= 0) {
        icon = Icon.snow();
      }
    }

    return (
      <div className={style.icon}>
        {icon}
      </div>
    );
  }
}

export default Icon;
