export default function geolocation(callback) {
  fetch('http://ip-api.com/json')
    .then(res => res.json())
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      callback(error, null);
    });
}
