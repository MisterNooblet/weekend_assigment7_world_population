
# AppleSeeds Weekend Assigment 7 - World Population App

This web app displays the population data of continents, countries and their cities. The data is fetched from two remote API's, and the app provides filtering and charting functionality of that data.


## Getting Started

To get started with the project, follow these steps:

Clone the repository:
```bash 
git clone https://github.com/MisterNooblet/weekend_assigment7_world_population.git
```
Install dependencies:
```bash 
npm install -g live-server
```
Move your terminal to cloned repository directory: 
```bash 
cd <path-to-content>
```
Start the server:
```bash
live-server .
```
Open localhost:8080 in a browser


## Demo

https://ar-worldpop.netlify.app/


## Features

- Displays population data for continents countries and their cities
- Allows filtering by continent, country and city
- Provides charting functionality for continent, country and city data


## Dependencies

`chart.js` for creating charts

`RESTful API` https://restcountries.com/ for fetching continent data

`POSTMAN API` https://documenter.getpostman.com/view/1134062/T1LJjU52/#intro for fetching country and cities data

## Project Development Roadmap

### Functionality:

- Basic structure of the application and analyzing the source API's data
- Filtering only countries that have data on both API's to avoid non functional buttons
- Displaying data using Graph's
- Disabling and enabling buttons while fetching data from remote API

### Design:

- Basic styling
- Styling buttons , and country buttons with their flag as background
- Styling the graph's text color , background , and data colors

### Performance:
- Make comparison of countries between two diffrent API's with `Promise.all` to avoid "freezing" the apps functionality
- Store all remote data in browsers localstorage


### User Experience:

- Add a spinner to indicate to the user that the data is loading.
- Make application responsive for mobile and tablet devices.
- Wrap buttons in a scroll box on small screens to avoid losing graph's responsivness functionality

### Documentation:

- Comment code for general explanation of the functionality's flow
- Add readme to the repository


## Lessons Learned

- Working with multiple API's to cross data and filter it

- Data massaging to the "guts" of the data

- Breaking down my application's code to small parts that communicate with each other through a main controller script

- Taking in cosideration of how the Callback Queue works after some long hour's of headache figuring out why stuff don't work the way i wanted.


## Authors

- [@MisterNooblet](https://www.github.com/MisterNooblet)


## 🚀 About Me

I'm a full stack development student.


## PS

Feel free to use the code and don't forget to Star ⭐ the repository.

