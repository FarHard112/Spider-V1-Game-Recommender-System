import pandas as pd
from sqlalchemy import create_engine

# Load the CSV file
csv_file = 'final_user_activities.csv'  # Replace with your file path
df = pd.read_csv(csv_file)

# Truncate data in 'original_price' column to a specific length
# Create a connection to the SQL Server
engine = create_engine(
    'your db connection string'
)

# Import the CSV data into the SQL Server table with progress tracking
chunksize = 10000
total_rows = len(df)
with engine.begin() as conn:
    for i, chunk in enumerate(range(0, total_rows, chunksize)):
        df.iloc[chunk:chunk +
                chunksize].to_sql('GameUserBehavior', conn, if_exists='append', index=False)
        print(
            f"Imported {min(chunk+chunksize, total_rows)} of {total_rows} rows")

print("Import completed.")
