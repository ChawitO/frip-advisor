# Frip Advisor
## Overview
This project was assigned to me by General Assembly during Software Engineering Immersive course. This was done in 3 people group with [Olly Aulakh](https://github.com/ollyaulakh) and [Simon Adr](https://github.com/simonadr), with the aim to build a complete website with the frontend along with our own backend API and database.

We chose to build a trip planner website, inspired by TripAdvisor. Our website allows you to register and create your trip plan. Search for the city destination, then search for the hotels and the flights, along with weather forcast for the trip.

The project is currently deployed at https://frip-advisor.herokuapp.com/.

## Timeframe
1 week

## Technologies
* React
* SCSS
* Node.js
* MongoDB
* Mongoose
* Webpack
* Bulma
* Kajak API
* Booking API
* DarkSky API
* Zomato API

# Instructions
![Imgur](https://i.imgur.com/ERmuOvX.png)
Create your trip here with the form. State your home city and your destination city for the trip, along with the dates where your trip will take place.

![Imgur](https://i.imgur.com/2Yn4o8p.png)
When clicking on 'search' button for the cities, it will search and fill in the city, assigning the key to be used with other APIs.

![Imgur](https://i.imgur.com/t4S7NO6.png)
When you create the trip, you will be taken to the trip show page. Where you can click on the 'search hotel' to list the hotels in the destination city. Or click on 'search flight' to be taken to the flight search page.

You can also see the weather forcast for the first day of the trip.

![Imgur](https://i.imgur.com/KN8fADI.png)
On the flight search page, you will see lists of flights. When clicking on one, it will expand and show you the details of the flight, as shown on the bottom flight on the image above.

# Process
We decided on the theme and idea of the project as a group, and we chose to make this trip planner. We went with Bulma for CSS framework to keep the styling consistent across the pages.

We divided our work, but because I had the most experience out of us 3, I handled most of the tasks, including reading and studying all the 4 third party APIs we used.

I setup the base settings and backbones for both Node.js backend and React frontend.

I handled most of the backend code, except the user model. I built the Trip model, which we called Frip for this project, along with every 3rd party API call from our backend to 3rd party servers. And the cache function to save up on repetitive API calls.

I am especially proud of the backend cache, which cache data from 3rd party API calls, store it in the database and return the data if the same API is called again with the same parameters. Since we were allowed only 500 calls per week for the API free trials and I figured we will run out of it pretty quickly.
```jsx
async function get(base, params = {}, headers) {
  const url = `${base}?${Object.entries(params).map(item => `${item[0]}=${item[1]}`).join('&')}`

  const cache = await Cache.findOne({ url }) || await axios.get(url, headers)
    .then(res => Cache.create({ url, data: JSON.stringify(res.data) }))
    .catch(err => console.log('err in lib/cache.js get():', err))

  return JSON.parse(cache.data)
}
```

For the frontend code, I handled all the API calls to our backends, along with the React states, JSX code displaying the data on all parts, and most of the SCSS styling for the pages, aside from the register and login page in which I did not do the styling.

For the flight search page, along with the flights listing, I handled the backend, frontend, along with the SCSS styling.

# Challenges
This project was the toughest one out of all 4 I have done at General Assembly. Not because of complexity of the project itself, but because of one of the teammates. The person chose not to put much effort into this project, and in general was unconcerned with the outcome of this project. This left my other teammate and me to handle most of the workload, and because I was more confident in the more challenging areas of the project, we decided that I would work on them. Because we did not want a totally breakdown of the group, we assigned some easy tasks to the other member.

# Wins
* I learn to come to terms with the fact that I cannot choose my teammates all the time, which is what real life works are usually. Compromise is key.
* Learn to focus on the major important features and leave out the minor ones for later.
* Project planning, make sure everything important was finished in time for the deadline

# Further Features
* Better integrate each aspects of the trip together, such as hotels, flights, and weather forecast.
* Right now you can search for flight, but cannot assign it to the trip yet.
