// https://cors-anywhere.herokuapp.com/
export default function quotes(callback) {
  fetch('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
    .then(res => res.json())
    .then(quote => callback(null, quote))
    .then(err => callback(err, null));
}
