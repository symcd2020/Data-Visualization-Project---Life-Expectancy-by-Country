import geopandas as gpd
import pandas as pd

# Read the GeoJSON file containing country boundaries
gdf = gpd.read_file('countries.geojson')

# Read the list of countries from the CSV file
df_countries = pd.read_csv(r'C:\Users\sym0002\EdX_Bootcamp\Data-Visualization-Project---Life-Expectancy-by-Country\Data\CountriesandContinents.csv')
countries_of_interest = df_countries['Country'].tolist()

# Filter the GeoDataFrame to include only the countries of interest
filtered_gdf = gdf[gdf['name'].isin(countries_of_interest)]

# Initialize a dictionary to store country coordinates
country_coordinates = {}

# Iterate through the filtered GeoDataFrame and extract coordinates
for idx, row in filtered_gdf.iterrows():
    country_name = row['name']
    coordinates = []

    # Handle Polygon geometries
    if row['geometry'].geom_type == 'Polygon':
        for coord in row['geometry'].exterior.coords:
            coordinates.append((coord[0], coord[1]))

    # Handle MultiPolygon geometries
    elif row['geometry'].geom_type == 'MultiPolygon':
        for polygon in row['geometry']:
            for coord in polygon.exterior.coords:
                coordinates.append((coord[0], coord[1]))

    # Add country coordinates to dictionary
    country_coordinates[country_name] = coordinates

# Print the coordinates for each country
for country, coords in country_coordinates.items():
    print(f"{country}: {coords}")