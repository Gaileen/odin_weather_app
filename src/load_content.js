// DOM manipulation events (entire page) ONLY here.

import processWeather from "./weather_handler";
import processImg from "./img_handler";

// Takes in a click/keydown event from Submit btn.
const loadPage = () => {
    // Get user input (a location).
    const location_in = document.getElementById("location-in");
    const location_form = document.getElementById("location-form");

    // Generate weather content for location whenever input.
    location_form.addEventListener("submit", async function(e) {
        e.preventDefault(); // Stay on same url.
        const location_header = document.querySelector(".location");
        const weather_container = document.querySelector(".weather-content");
        try {
            const { full_address, week_data } = await processWeather(location_in.value);
            location_in.value = ""; // Reset search bar.
            
            // Set location and weather content.
            location_header.textContent = full_address;

            weather_container.style.color = "black";
            weather_container.innerHTML = "";
            let i = 0; // Iterator to set ids for each day.
            week_data.forEach(day => {
                const day_container = document.createElement("div");
                day_container.classList.add("day-container");
                day_container.id = "day-" + i;
                weather_container.appendChild(day_container);

                // day_container will have 2 divs for data & an img/gif.
                // Data div here:
                const day_text = document.createElement("div");
                day_text.classList.add("day-text");
                day_container.appendChild(day_text);
                // Date
                const date_text = document.createElement("div");
                day_text.appendChild(date_text);
                date_text.textContent = day["datetime"];
                // Description
                const description = document.createElement("div");
                day_text.appendChild(description);
                description.textContent = day["description"];
                // Current temp
                const curr_temp = document.createElement("div");
                day_text.appendChild(curr_temp);
                curr_temp.textContent = "Current temp: " + day["temp"] + " F";
                // Min & max temp
                const temp_range = document.createElement("div");
                day_text.appendChild(temp_range);
                temp_range.innerText = "Min temp: " + day["tempmin"] + " F\nMax temp: " + day["tempmax"] + " F";

                // Icon ...?
                //maybe use this to determine which gif to display

                // Img/gif div here: 
                const gif = document.createElement("img");
                gif.classList.add("day-text");
                day_container.appendChild(gif);
                processImg().then((response_url) => {
                    gif.src = response_url;
                });

                i++
            });
        
        } catch (err) {
            console.log(err);
            // Display error msg for user.
            weather_container.style.color = "rgb(67, 0, 0)";
            weather_container.textContent = location_in.value + " is not a valid location.**";
        }
    });
}

export default loadPage;