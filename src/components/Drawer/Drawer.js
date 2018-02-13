import React from 'react';

import style from './drawer.scss';

class Drawer extends React.Component {
  listCities() {
    return this.props.cities.map((item, i) => {
      const locationIcon = item.location ?
        (
          <svg className={style.locationIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z" />
          </svg>
        ) :
        '';

      return (
        <li key={`${item.city}_${item.key}`} onClick={() => this.props.onChangeCity(i)}>
          {locationIcon}
          {item.city}
        </li>
      );
    });
  }
  render() {
    let containerClass = style.container;
    containerClass += this.props.opened ? ` ${style.opened}` : '';

    return (
      <React.Fragment>
        <div className={containerClass}>
          <div className={style.burgerIconWrapper} onClick={this.props.onToggle}>
            <div className={`${style.burgerIcon} ${style.opened}`} />
          </div>
          <div className={style.citiesWrapper}>
            <ul>
              {this.listCities.bind(this)()}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Drawer;
