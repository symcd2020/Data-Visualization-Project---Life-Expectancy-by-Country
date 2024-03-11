import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    data = []
    with open(csv_file_path, 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            data.append(row)
    
    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)


csv_to_json('CleanedLifeExpectancyData1950to2024.csv', 'CleanedLifeExpectancyData1950to2024.json')
csv_to_json('CleanedLifeExpectancyData1950to2100.csv', 'CleanedLifeExpectancyData1950to2100.json')
