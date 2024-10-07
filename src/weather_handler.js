// processWeather

function fetchWeather(location) {
    const key = "7TKQUWSXQNAUD4D6ZGFPA28LW"; // (public api)
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

    // **Add return in front of fetch call so fetch chain is actually returned
    return fetch(url + location + "?key=" + key, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .catch(e => {
            console.log(location + " is not a valid location.", e);
        });
}

// Process JSON to get only the data we need.
async function processWeather(location) {
    try {
        const data = await fetchWeather(location);
        if (data) {
            const full_address = data.resolvedAddress;
            const week_data = []; // 7-day weather

            data.days.splice(8).forEach(day => {
                let {datetime, temp, tempmin, tempmax, description, icon} = day;
                week_data.push({datetime, temp, tempmin, tempmax, description, icon});
            });
            
            return { full_address, week_data };
        }
    } catch(e) {
        console.log(e);
    }
}

export default processWeather;