# Use the official Python 3.9 image as the base
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Create a virtual environment and activate it
RUN python -m venv venv
RUN . venv/bin/activate

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy your application files into the container
COPY . .

# Expose the port your Flask app will run on
EXPOSE 5000

# Run your Flask app
CMD ["python", "app.py"]
