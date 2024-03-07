-- Create a new table
CREATE TABLE country (
	Country VARCHAR PRIMARY KEY,
	Continent VARCHAR NOT NULL
);

-- Import data from CSV by using the "Import/Export Data..." option on the Table.

SELECT *
FROM country

-- Create a new table
CREATE TABLE males (
	Country VARCHAR,
	Year INT,
	MaleAvgLifeExpectancy DECIMAL(4,2)
);

-- Import data from CSV by using the "Import/Export Data..." option on the Table.

Select *
FROM males

-- Create a new table
CREATE TABLE females (
	Country VARCHAR,
	Year INT,
	FemaleAvgLifeExpectancy DECIMAL(4,2)
);

-- Import data from CSV by using the "Import/Export Data..." option on the Table.

Select *
FROM females

-- Create a new table
CREATE TABLE combined (
	Country VARCHAR,
	Year INT,
	CombinedAvgLifeExpectancy DECIMAL(4,2)
);

-- Import data from CSV by using the "Import/Export Data..." option on the Table.


Select *
FROM combined


--Joining tables
SELECT combined.country, country.continent, combined.year, combined.combinedavglifeexpectancy, males.maleavglifeexpectancy, females.femaleavglifeexpectancy
FROM combined
JOIN country
ON (combined.country = country.country)
JOIN males
ON (combined.country = males.country AND combined.year = males.year)
JOIN females
ON (combined.country = females.country AND combined.year = females.year)


--Query to see only 1950 to 2024
SELECT combined.country, country.continent, combined.year, combined.combinedavglifeexpectancy, males.maleavglifeexpectancy, females.femaleavglifeexpectancy
FROM combined
JOIN country
ON (combined.country = country.country)
JOIN males
ON (combined.country = males.country AND combined.year = males.year)
JOIN females
ON (combined.country = females.country AND combined.year = females.year)
WHERE combined.year BETWEEN 1950 AND 2024



