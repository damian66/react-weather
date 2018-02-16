import React from 'react';

import style from './icon.scss';

class Icon extends React.Component {
  static sun() {
    return (
      <div className={style.sun} />
    );
  }

  static moon() {
    return (
      <div className={style.moon}>
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }

  render() {
    let icon = Icon.sun();

    if (this.props.weather && this.props.weather.sys) {
      const currentDate = new Date().getTime();
      if (currentDate < this.props.weather.sys.sunrise ||
          currentDate > this.props.weather.sys.sunset) {
        icon = Icon.moon();
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
