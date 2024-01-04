import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

seasons_list = [f"{year}-{year+1}" for year in range(2017, 2023)]
print(seasons_list)

data = []

for season in seasons_list:
    url = f"https://fbref.com/en/comps/9/{season}/schedule/{season}-Premier-League-Scores-and-Fixtures"

    # Fetch the webpage content
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "lxml")

    # Find the table containing the data
    table = soup.find("table", {"class": "stats_table"})

    # Use pandas to read the HTML table
    df = pd.read_html(str(table))[0]  # Convert the table to a DataFrame
    df.drop(["Match Report", "Notes", "Day", "Time"], axis=1, inplace=True)
    df.dropna(inplace=True)
    
    df['Season'] = season

    df['Wk'] = pd.to_numeric(df['Wk'], errors='coerce').fillna(0).astype(int)
    df['Attendance'] = pd.to_numeric(df['Attendance'], errors='coerce').fillna(0).astype(int)
    data.append(df)
    print(f"Data fetched for season: {season}")
    time.sleep(5)

all_seasons = pd.concat(data, ignore_index=True)
all_seasons.rename(columns={'xG': 'xGHome', 'xG.1': 'xGAway'}, inplace=True)
all_seasons.to_csv("all_prem_stats.csv", index=False)
