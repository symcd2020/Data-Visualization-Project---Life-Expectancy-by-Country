# Data Visualization Project - Life Expectancy by Country

Gourp Members: Lori Bissell, Zac Blankenship, Demetria Horton, Shelby McDaniel, Elcia Wesley

## Overview of the project and its purpose
For this project, our team is looking at the average life expectancy by country. "Life expectancy at birth reflects the overall mortality level of a population. It is the average number of years that a person may expect to live, from birth to death."

"There are 195 countries in the world today. The total comprises 193 countries that are member states of the United Nations and 2 countries that are non-member observer states." Our data looks at 195 countries. 

The purpose of the project is to be able to identify average life expectancies over the years for each country. You can see the changes over time and sexes. You can also see the the average life expectancies by continents. Additionally, you can see the countries with the highest and lowest life expectancies. 

## Data
The data we are using for this project comes from the United Nations (UN). The data set included 286 countries or areas with the average life expectancy for males, females, and both sexes combined for each year from 1950-2101. Our team decided to narrow our scope and only look at 193 countires recognized by the UN with data from 1950-2024. We also added in data identifying the continent for each country. Then we used a geoJSON file found online to assist us in creating the map. 

The data pulled from the UN was in three different files, one for each sex and one combined. Additionally, there was a fourth file which included a list of countries and their continent. These CSV files were added as tables to a database in SQL and joined together to export one CSV file. This new merged CSV file was then converetd to a JSON in python. 

The geoJSON document we were using needed to be cleaned up to ensure the country names match the country names from our UN data. These names were cleaned up to be correctly displayed on the world map. In order to pull in the geoJSON data from the local file, we needed to convert that file into a JavaScript file and contain all the geo data into a single variable. We could then use that variable within our logic.js file to pull any data from the geoJSON.

## Instructions on how to use and interact with the project
- Drop Down Menu 
    ADD TEXT HERE!!!

- Map
    ADD TEXT HERE!!!

- Pie Chart
    ADD TEXT HERE!!!

- Bar Charts
    ADD TEXT HERE!!!

## At least one paragraph summarizing efforts for ethical considerations made in the project
We used reliable UN data trusting they provided ethical data. We verified the data we produced on our app was accurately reflecting the UN data. 

ADD MORE HERE!!!


## Sources
https://data.un.org/Data.aspx?q=life+expectancy&d=PopDiv&f=variableID%3a68

https://data.un.org/Data.aspx?q=life+expectancy&d=PopDiv&f=variableID%3a66

https://data.un.org/Data.aspx?q=life+expectancy&d=PopDiv&f=variableID%3a67

http://geojson.xyz/


## References

https://worldpopulationreview.com/country-rankings/life-expectancy-by-country

https://www.worldometers.info/geography/how-many-countries-are-there-in-the-world/#:~:text=Countries%20in%20the%20World%3A&text=There%20are%20195%20countries%20in,and%20the%20State%20of%20Palestine

ChatGPT

StackOverflow

EdX Instructor, TAs, and tutors
