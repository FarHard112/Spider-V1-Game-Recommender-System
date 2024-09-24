FROM python:3.9

WORKDIR /app

# Copy requirements file
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code and model files
COPY app2.py .
COPY pv_dataframe.pkl .
COPY df_user_dataframe.pkl .

# Expose the new port the app will run on
EXPOSE 5959

# Command to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5959", "app2:app"]