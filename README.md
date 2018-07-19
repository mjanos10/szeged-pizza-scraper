# Szeged Pizza Scraper

This app is a NodeJs app, built with ExpressJs, Mongo, Mongoose, Axios, Cheerio and Inquirer.

The goal is to create an app that will periodically scrape all pizza places in Szeged, Hungary and save their pizzas in a database, making them available through a REST API.

## Requirements

* NodeJs > v.8
* MongoDB
* Yarn

## Installation

```
$ yarn # Install dependencies
```

## Running the app

At the moment only some terminal commands are available (at least until more scrapers will be ready). They are using inquirer for easy handling.

### Add a new pizza place

```
$ npm run add-new-pizza-place
```

### Scrape on or all available pizza places

```
$ npm run scrape-pizza-places
```

## Pizza Places to scrape

* ~~Pizza Futár~~
* ~~Pizza Torony~~
* ~~Pizza Forte~~
* Pizza Király
* Pizza Monster
* Pizza Monkey
* Turbopizza
* Margaréta Pizzéria
* Lucky Pizza
* Pizzaguru
* Pizza e Pasta
* Don Quijote Pizzéria
* HappyHOT Pizza
* Bringa Pizzéria
* Bella Italia Pizzéria
* Hóbiárt Pizzéria és Étterem
* Bulldog Pizza

