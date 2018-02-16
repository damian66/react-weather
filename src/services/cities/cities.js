const key = 'AIzaSyAGxUXRMT4nCBCzAft9Nf025wDXHa4iQnU';

export default function cities(query) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&region=pl&key=${key}`)
    .then(res => res.json());
}
