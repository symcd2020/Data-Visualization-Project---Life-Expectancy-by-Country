# Data Visualization Project - Life Expectancy by Country

## Group Members
- Lori Bissell
- Zac Blankenship
- Demetria Horton
- Shelby McDaniel
- Elcia Wesley

## Overview of the Project and Its Purpose
For this project, our team is examining the average life expectancy by country. "Life expectancy at birth reflects the overall mortality level of a population. It is the average number of years that a person may expect to live, from birth to death."

"There are 195 countries in the world today. The total comprises 193 countries that are member states of the United Nations and 2 countries that are non-member observer states." Our data covers these 195 countries.

The purpose of the project is to identify average life expectancies over the years for each country. It allows you to observe changes over time and across sexes, as well as compare average life expectancies by continents. Additionally, it highlights the countries with the highest and lowest life expectancies.

## Data
The data for this project comes from the United Nations (UN). The initial dataset included 286 countries or areas with average life expectancy for males, females, and both sexes combined for each year from 1950-2101. Our team decided to focus only on the 195 countries recognized by the UN, with data from 1950-2024. We also incorporated data identifying the continent for each country. Additionally, we used a geoJSON file found online to assist in creating the map.

The data from the UN was stored in three different files, one for each sex and one combined. Furthermore, there was a fourth file that included a list of countries and their continents. These CSV files were added as tables to a SQL database and joined together to export one CSV file. This new merged CSV file was then converted to a JSON format in Python.

The geoJSON document we used needed to be cleaned to ensure the country names matched those from our UN data. These names were updated to display correctly on the world map. To incorporate the geoJSON data from the local file, we converted that file into a JavaScript file and contained all the geo data into a single variable. We could then use that variable within our `logic.js` file to access any data from the geoJSON.

The geoJSON and the JSON file used for the visualizations were then uploaded into a MongoDB database.

## Instructions on How to Use and Interact with the Project
- **Drop Down Menu**: The user will choose a year. The years 1950 - 2024 are available.
- **Map**: After a year is chosen in the drop down, the user will be able to select a country by clicking on it and the map will display the total average population life expectancy, the male population life expectancy, and the female population life expectancy.
- **Pie Chart**: After a year is chosen in the drop down, the user will be able to hover over the slice in the pie chart to see the total average population life expectancy per continent.
- **Bar Charts**: After a year is selected, the bar charts will show the Top Ten and Bottom Ten Countries according to Life Expectancy.

## Ethical Considerations Made in the Project
Throughout the duration of our project, ethical considerations were paramount in every step of the process. Our foundation rested on the utilization of reliable UN data, a trusted source known for its commitment to providing information freely accessible for public use. We meticulously cross-referenced and verified the data integrated into our application to ensure its accuracy and alignment with the original UN datasets. Moreover, privacy and security were non-negotiable aspects of our data collection strategy; no personally identifiable information (PII) was ever included in the data we gathered, safeguarding user privacy. In line with ethical standards, all sources and references utilized in our project were accurately cited, acknowledging the contributions of others and promoting transparency within our work. By prioritizing ethical practices, we aimed not only to deliver a robust and reliable solution but also to uphold the principles of integrity and responsibility in our project's execution.

## Presentation
[View the Presentation on Canva](https://www.canva.com/design/DAF_h1QMOHs/kbZw7DPVhkk4E1IRu5EFXg/edit?utm_content=DAF_h1QMOHs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Sources
- [UN Data - Variable ID: 68](https://data.un.org/Data.aspx?q=life+expectancy&d=PopDiv&f=variableID%3a68)
- [UN Data - Variable ID: 66](https://data.un.org/Data.aspx?q=life+expectancy&d=PopDiv&f=variableID%3a66)
- [UN Data - Variable ID: 67](https://data.un.org/Data.aspx?q
