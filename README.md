# NBA Stats Visualizer

[NBA Stats Visualizer](https://deli123.github.io/NBA-Stats-Visualizer/) aims to provide a player's average regular season
stats in 6 categories: points, assists, rebounds, steals, blocks, and minutes.  
These stats will be displayed in 6 different graphs for each corresponding category.

## Demo

![alt text](demo.gif)

## Features
- 6 distinct graphs for points, assists, rebounds, steals, blocks, and minutes
  - Hovering over a specific data point will display a small tooltip above it that shows the year, player, and stat number.
  - Clicking on the legend for a specific player will toggle its display status on the graph.
- The user can search for a player with a specific range of seasons
- *Add a random player* button that will randomly find a player and choose a random range of seasons

## Technologies, Libraries, APIs
- Chart.js to render line graphs
- [balldontlie API](https://www.balldontlie.io) to fetch player data
- Webpack and Babel to bundle and transpile JavaScript code

## Additional Information
- Since this website uses the [BallDontLie API](https://www.balldontlie.io) which only allows up to 60 requests per minute, some requests may not be fulfilled. When this limit is reached, the *Add* button will be disabled for 60 seconds.

- This API only includes data from seasons 1979 to current.
  
- The number of requests is equal to [**1 + *number of seasons*)**]. The first request is used to check if a player exists.  

- Data for the years of which a player hasn't played a game in will be automatically filled with a zero.
For example, if the user wants to see the stats of **Lonzo Ball** for the **2015 - 2018** seasons, the stats for the **2015** and **2016** seasons will be filled with zeros. This is because Lonzo Ball hasn't played a game in those certain seasons.
