import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# This program scrapes data from the fbref website to get a season's fixtures and scores and stores them in a CSV file which will then be uploaded into a postgres database. 

# Creating a list of seasons, specifically the ones that make use of xG data
seasons_list = [f"{year}-{year+1}" for year in range(2017, 2023)]

data = []

for season in seasons_list:
    # Creating a url
    url = f"https://fbref.com/en/comps/9/{season}/schedule/{season}-Premier-League-Scores-and-Fixtures"

    # Fetching the webpage content for a season
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "lxml")

    # Finding the table containing the data
    table = soup.find("table", {"class": "stats_table"})

    # Use pandas to read the table, and coverting the table to a DataFrame
    df = pd.read_html(str(table))[0]
    df.drop(["Match Report", "Notes", "Day", "Time"], axis=1, inplace=True)
    #Getting rid of any empty rows
    df.dropna(inplace=True)
    
    # Adding a column that has what season the game belongs to
    df['Season'] = season

    # Transforming the types to what i need them to be
    df['Wk'] = pd.to_numeric(df['Wk'], errors='coerce').fillna(0).astype(int)
    df['Attendance'] = pd.to_numeric(df['Attendance'], errors='coerce').fillna(0).astype(int)
    
    #Adding that dataframe to a list of dataframes
    data.append(df)
    
    print(f"Data fetched for season: {season}")
    #Putting the program to sleep for 5 seconds so the website does not time out
    time.sleep(5)

#Adding the list of seasons to one dataframes, and exporting the dataframe to a csv file.
all_seasons = pd.concat(data, ignore_index=True)
all_seasons.rename(columns={'xG': 'xGHome', 'xG.1': 'xGAway'}, inplace=True)
all_seasons.to_csv("all_prem_stats.csv", index=False)
