export default function weather(pos, callback) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lon}&APPID=5b9f4354346df4bdeb1e608b595c97f9`)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
}
