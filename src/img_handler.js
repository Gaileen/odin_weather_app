// processImg

function fetchImg() {
    const key = "ZagsQn8kpI90KxpW7Y8BDMv1GFWdfYIc"; // (public api)
    const url = "https://api.giphy.com/v1/stickers/translate";
    // const search = "smiski";
    // const search = "@sonnyangelusa";
    const search = "@sonnyangelusa smiski";

    return fetch(url + "?api_key=" + key + "&s=" + search, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .catch(e => {
            console.log(":( Couldn't search for " + search + ".", e);
        });
}

// Process JSON to get the data we need.
async function processImg(location) {
    try {
        const response = await fetchImg(location);
        if (response) {
            return response.data.images.original.url;
        }
    } catch(e) {
        console.log("Sorry, can't load smiskis! We've likely exceeded the daily limit of 100 API request calls to Giphy.")
    }
}

export default processImg;