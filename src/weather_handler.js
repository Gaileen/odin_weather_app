// processWeather

function fetchWeather(location) {
    const key = "7TKQUWSXQNAUD4D6ZGFPA28LW"; // (public api)
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

    // **Add return in front of fetch call so fetch chain is actually returned
    return fetch(url + location + "?key=" + key, {mode: 'cors'})
        .then(function(response) {
            if (!response.ok) {
                console.log("Network error: " + response.statusText);
            }
            return response.json();
        })
        .catch(e => {
            console.log(e);
        });
}

// Process JSON to get only the data we need.
async function processWeather(location) {
    //need: currentConditions.temp, currentConditions.feelslike, currentConditions.conditions
    // currentConditions.datetime
    // .days (an array of 15)
    try {
        const data = await fetchWeather(location);
        if (data) {
            const full_address = data.resolvedAddress;
            console.log(data.days);

            return {}
        }
    } catch(e) {
        console.log(e);
    }
}

export { processWeather };