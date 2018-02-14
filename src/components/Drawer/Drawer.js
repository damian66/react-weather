import React from 'react';

import style from './drawer.scss';

import cities from './../../services/cities';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formVisible: this.props.formVisible ? this.props.formVisible : false,
      formClass: style.form,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      formVisible: props.formVisible,
      formClass: style.form,
    });
  }

  listCities() {
    return this.props.cities.map((item, i) => {
      const locationIcon = item.location ?
        (
          <svg className={style.locationIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M443.683 4.529L27.818 196.418C-18.702 217.889-3.39 288 47.933 288H224v175.993c0 51.727 70.161 66.526 91.582 20.115L507.38 68.225c18.905-40.961-23.752-82.133-63.697-63.696z" />
          </svg>
        ) :
        '';
      const key = `${item.city}_${item.key}`;

      const deleteButton = !item.location ?
        (
          <div className={style.deleteButton} onClick={this.deleteCity.bind(this)} />
        ) :
        '';

      let color = {};
      if (i === this.props.activeCity) {
        color = {
          color: this.props.color,
        };
      }

      return (
        <li
          key={key}
          id={key}
          ind={i}
          onClick={this.changeCity.bind(this)}
          style={color}
        >
          {locationIcon}
          {item.city}
          {deleteButton}
        </li>
      );
    });
  }

  addIconClick(e) {
    if (this.state.formVisible && e.target.className.indexOf(style.addIcon) < 0) return;
    this.setState({
      formVisible: !this.state.formVisible,
      formClass: style.form,
    }, () => {
      if (this.state.formVisible) {
        setTimeout(() => {
          this.setState({
            formClass: `${style.form} ${style.formVisible}`,
          });
        }, 200);
      }
      if (this.input) {
        this.input.focus();
        this.input.value = '';
      }
    });
  }

  addCity(query) {
    if (query.replace(/ /g, '') === '' || query.length < 3) {
      return;
    }
    cities(query, (err, res) => {
      if (!res) return;
      const result = res.results[0];
      const cityName = result.address_components.filter(i => i.types[0] === 'locality' || i.types[1] === 'locality')[0].long_name;

      this.props.onAddCity({
        city: cityName,
        lat: result.geometry.location.lat,
        lon: result.geometry.location.lng,
        key: new Date().getTime(),
      });

      this.setState({
        formVisible: false,
      });
    });
  }

  changeCity(e) {
    if (!e.target.getAttribute('ind')) return;

    const index = e.target.getAttribute('ind');

    if (this.props.onChangeCity) {
      this.props.onChangeCity(index);
    }
  }

  deleteCity(e) {
    const ind = e.target.parentNode.getAttribute('ind');
    if (!ind || !this.props.onDeleteCity) return;

    this.props.onDeleteCity(ind);
  }

  keyup(e) {
    if (e.keyCode === 13) {
      this.addCity.bind(this)(this.input.value);
    }
    return true;
  }

  render() {
    let containerClass = style.container;
    containerClass += this.props.opened ? ` ${style.opened}` : '';

    let addIconClass = style.addIconWrapper;
    addIconClass += this.state.formVisible ? ` ${style.addForm}` : '';
    addIconClass += this.props.cities.length >= 5 ? ` ${style.addIconHidden}` : '';

    return (
      <React.Fragment>
        <div className={containerClass}>
          <div className={style.burgerIconWrapper} onClick={this.props.onToggle}>
            <div className={`${style.burgerIcon} ${style.opened}`} />
          </div>
          <div
            className={addIconClass}
            style={{ background: this.props.color }}
            onClick={this.addIconClick.bind(this)}
          >
            <div className={style.addIcon} />
            <div className={this.state.formClass}>
              <input
                type="text"
                placeholder="City name"
                ref={(input) => { this.input = input; }}
                onKeyUp={this.keyup.bind(this)}
              />
              <input
                type="button"
                value="Add"
                onClick={() => this.addCity.bind(this)(this.input.value)}
              />
            </div>
          </div>
          <div className={style.citiesWrapper}>
            <ul className={style.cities}>
              {this.listCities.bind(this)()}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Drawer;
