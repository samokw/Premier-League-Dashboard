# Premier-League-Dashboard

Browse Games from the Premier League, La liga, Serie A, and Bundesliga

## Screenshots

### Landing Page

![Home Page](/README/Landing.png)

### Home Page

![Home Page](/README/Home.png)

### Team Dashboard Page

![Matches Page](/README/TeamDashboard.png)

### Fixtures By Year Page

![Fixtures By Year](/README/MatchesByYear.png)

## Technologies
* Spring Boot
* Java Persistence API, Repositories and JPQL
* HSQL DB
* React JS
* Chart JS

## Getting Started

### Dependencies
Youll need to have:
Python 3.11, Java 17, and NodeJs all installed

#### Python Libaries
* Pandas
* Requests
* BeautifulSoup
* Time

### Executing program
* To scrape the website
```
cd fbref-datascraper
```
```
python fbref-datascraper.py
```
* Frontend
```
cd premier-league-dashboard-frontend/prem-dashboard
```
```
npm install
```
```
npm run dev
```
* Backend
```
cd premier-league-dashboard-backend
```
```
./mvnw spring-boot:run
```

* Hosted on
https://www.samokw.name

## Next Steps
* Automate the process of pulling the data yearly, currently working giving lambda function the ability to update data
* Fix bug with home button

## Author Information
Chibuzor Okwusiuno
Contact me:
okwusiunosamuel@gmail.com
