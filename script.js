function showdate(date) {
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let day = days[date.getDay()];
        let hour = date.getHours();
        if (hour < 10) {
          hour = `0${hour}`;
        }
        let minute = date.getMinutes();
        if (minute < 10) {
          minute = `0${minute}`;
        }

        return `${day} ${hour}:${minute}`;
      }
      let dayDate = document.querySelector("#day-time");
      dayDate.innerHTML = showdate(new Date());

      function showTemp(response) {
        let temperature = Math.round(response.data.main.temp);
        let degValue = document.querySelector("#degree-value");
        degValue.innerHTML = `${temperature}<span class="deg-sign">°C</span>`;

        document.querySelector("#city-name").innerHTML = response.data.name;

        let humidity = document.querySelector("#humidity");
        let humid = Math.round(response.data.main.humidity);
        humidity.innerHTML = ` Humidity: ${humid}%`;

        let wind = document.querySelector("#wind");
        let windy = Math.round(response.data.wind.speed);
        wind.innerHTML = `Wind: ${windy} km/h`;

        let description = document.querySelector("#description");
        description.innerHTML = response.data.weather[0].description;
      }
      function search(city) {
        let apiKey = "8944afa6845bd7c413a687258d3211ef";

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

        axios.get(`${url}&appid=${apiKey}`).then(showTemp);
      }

      function showCity(event) {
        event.preventDefault();
        let cityName = document.querySelector("#search-input").value;
        search(cityName);
      }

      let searchInput = document.querySelector("#search-city");
      searchInput.addEventListener("submit", showCity);

      function showLocation(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let apiKey = "8944afa6845bd7c413a687258d3211ef";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

        axios.get(`${url}&units=metric`).then(showTemp);
      }

      function callLocation() {
        navigator.geolocation.getCurrentPosition(showLocation);
      }

      let button = document.querySelector("#current-location-button");
      button.addEventListener("click", callLocation);

      search("New York");