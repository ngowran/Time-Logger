# Timelogger - Easy to Use, Firebase Friendly Timesheet Application

Timelogger is a full-stack web application designed to assist in the logging of activity time for projects. It features a React frontend, a Django backend, and a Firebase real-time database for seamless data management.

This application was primarily designed for use in college societies and volunteer work in Ireland, particularly the Enactus DCU society, however, for personal use, references to 'Enactus DCU' can and should be removed.

## Features

- Sign in using Google SSO
- Log time spent in minutes for a variety of reasons from a dropdown
- Shows a table of all times, using pagination, filtration and sorting
- Shows a total of hours spent
- Shows a bar chart breakdown of hours and their types

## Getting Started

1. From the root directory, create a virtual environment using

```bash
python -m venv env
```

2. Activate the virtual environment (Windows)

```bash
env\Scripts\activate.bat
```

3. After activating the virtual environment, run

```bash
pip install -r requirements.txt
```

4. In the frontend/ directory,

```bash
npm install
```

5. Create a production build of the frontend

```bash
npm run build
```

### Generates the following screen:

![alt text](https://i.imgur.com/EWWKDRo.png)

## Contributors

[Kevin Tomescu](https://github.com/kmanjt) and [Niamh Gowran](https://github.com/ngowran)
