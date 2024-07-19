import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# This program scrapes data from the fbref website to get a season's fixtures and scores and stores them in a CSV file which will then be uploaded into a postgres database. 

# Finding who won the game
def determine_winner(row):
    if row['HomeScore'] > row['AwayScore']:
        return row['Home']
    elif row['AwayScore'] > row['HomeScore']:
        return row['Away']
    else:
        return 'Draw'
# Creating a list of seasons
seasons_list = [f"{year}-{year+1}" for year in range(2009, 2024)]

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
    df['Attendance'].fillna(0, inplace=True) 
    # Adding a column that has what season the game belongs to
    df['Season'] = season

    # Transforming the types to what i need them to be
    df['Wk'] = pd.to_numeric(df['Wk'], errors='coerce').fillna(0).astype(int)
    df['Attendance'] = pd.to_numeric(df['Attendance'], errors='coerce').fillna(0).astype(int)
    
    # Adding that dataframe to a list of dataframes
    data.append(df)
    
    print(f"Data fetched for season: {season}")
    # Putting the program to sleep for 5 seconds so the website does not time out
    time.sleep(5)

# Adding the list of seasons to one dataframes, spliting the score into home score and away score
all_seasons = pd.concat(data, ignore_index=True)
all_seasons.drop(["xG", "xG.1"], axis=1, inplace=True)
all_seasons.dropna(inplace=True)
scores = all_seasons['Score'].str.extract(r'(\d+)–(\d+)', expand=True)
scores.columns = ['HomeScore', 'AwayScore']
scores = scores.apply(pd.to_numeric)
all_seasons[['HomeScore', 'AwayScore']] = scores

# Determining if the who won the game
all_seasons['Winner'] = all_seasons.apply(determine_winner, axis=1)
all_seasons['Date'] = pd.to_datetime(all_seasons['Date'])
all_seasons = all_seasons.rename_axis('MatchID').reset_index()
all_seasons.columns = all_seasons.columns.str.lower()

# Exporting to CSV
all_seasons.to_csv("all_prem_stats.csv", index=False)
print(all_seasons)
