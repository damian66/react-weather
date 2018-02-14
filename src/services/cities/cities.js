const key = 'AIzaSyAGxUXRMT4nCBCzAft9Nf025wDXHa4iQnU';

export default function cities(query, callback) {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&region=pl&key=${key}`)
    .then(res => res.json())
    .then(quote => callback(null, quote))
    .then(err => callback(err, null));
}
