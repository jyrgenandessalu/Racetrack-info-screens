# Racetrack

## Overview
The Racetrack App is a real-time race management system built with Node.js, React and Socket.IO. It allows receptionists, safety officials, and spectators to manage and view race sessions efficiently. This application includes interfaces for various roles, each designed to simplify specific tasks.

---

## Features

- Configure race sessions, drivers, and cars.
- Real-time race tracking with lap times and flag statuses.
- Public displays for spectators and race drivers.
- Secure employee interfaces requiring access keys.
- Real-time updates without polling.

---

## Installation instructions

### Prerequisite installations:
1. Node.js and npm:
   - Install Node.js (it includes npm). You can download it from [nodejs.org](https://nodejs.org/). (Make sure to download the LTS version.)
   - You can verify the installation by running `node -v` and `npm -v` in your terminal which will show which version is installed.
2. Ensure React is installed at the latest version
    ```
    bash
    npm install react-scripts@latest
    ```
3. Clone the repository:
    - Clone the repository to your local machine.
    ```
    git clone https://gitea.kood.tech/jurgenandessalu/racetrack.git
    ```
### Initial setup for application :
1. Navigate to the backend directory:
    ```
    cd racetrack/backend
    ```
2. Install the dependencies:
    ```
    npm install
    ```
3. Navigate to the frontend directory:
    ```
    cd racetrack/frontend/client
    ```
4. Install the dependencies:
    ```
    npm install
    ```
5. Set up the environment variables:
    - Open the .env file in the backend directory.
    - Add key values for the following variables which will be used to access the interfaces (note that the application will not work without these keys as per project requirements):
        - `receptionist_key`
        - `observer_key`
        - `safety_key`
        

### Running the application (localhost):
Use this method to run the application on a single device. (Should be sufficient for some testing purposes)
The application has two parts: backend and frontend.
The backend facilitates the communication between the interfaces and needs to be started first. After the backend is running, the frontend can be started.

1. Start the backend:
    - Navigate to the backend directory (racetrack/backend) and run:
    ```
    npm start
    ```
2. Start the frontend:
    - Do not close the backend terminal. Open a new terminal and navigate to the frontend directory (racetrack/frontend/client).
    - Run:
    ```
    npm start
    ```
    - If you have a browser open, a tab should automatically open. If not, open a tab and navigate to http://localhost:3001.
    - The application is now running and the interfaces can be accessed and interacted with.

### Running the application with tunneling service (ngrok):
Use this method to access the application from different devices or networks.
Note: You will need to sign up for a ngrok account and download the ngrok client to run the application this way.
Ngrok has a free tier but it is limited to 100 connections per day. Also the free tier has a limit of 4 clients that can be connected at the same time.
1. Start the backend:
    - Navigate to the backend directory (racetrack/backend) and run:
    ```
    npm start
    ```
2. Start ngrok:
    - In a separate terminal, run the following command to start ngrok:
    ```
    ngrok http --host-header=localhost:3000 3000
    ```
    - This will provide a public URL (e.g., https://qwerty-123-456-789-ngrok-free.app/). Copy this URL(This URL changes every time you put up the server). 
3. Update the frontend URL:
    - Replace the URL(const newSocket) in App.js(racetrack/frontend/client/src/App.js) with the public ngrok URL
4. Start the frontend:
    - In a third terminal, navigate to the frontend directory (racetrack/frontend/client) and run:
    ```
    npm start
    ```
    - As with the previous method, if you have a browser open, a tab should automatically open a tab on http://localhost:3001. However, you should close this tab as now the application will be accessible through the ngrok URL.

### Running the application in developer mode:
- Note that we included this mode as it is a requirement for the project. However, it is not entirely necessary as in the regular mode the safety official can end the race at any time they choose. 
1. Start the backend:
    - Navigate to the backend directory (racetrack/backend) and run:
    ```
    npm run dev
    ```
2. Proceed with the same steps from above for the method of your choice.
    
---

## System Interfaces and Routes

### Employee Interfaces (Admin Login Required)

| Interface        | Persona            | Route            |
|------------------|--------------------|------------------|
| Front Desk       | Receptionist       | `/front-desk`    |
| Race Control     | Safety Official    | `/race-control`  |
| Lap-line Tracker | Lap-line Observer  | `/lap-line-tracker` |

### Public Displays (No Login Required)

| Interface      | Persona         | Route             |
|----------------|-----------------|-------------------|
| Leader Board   | Spectator       | `/leader-board`   |
| Next Race      | Race Driver     | `/next-race`      |
| Race Countdown | Race Driver     | `/race-countdown` |
| Race Flags     | Race Driver     | `/race-flags`     |

---

## Usage instructions
Due to this being an MVP, the interfaces might have their processes interrupted of fall out of sync if different ones are opened while a race is ongoing. We did our best to make it as stable as possible but it is recommended that the Safety Official,Lap-line Observer, and Receptionist have the interfaces they would need open before starting the races for the day.
The base URL will bring you to a landing page with links to the different interfaces. Otherwise the routes can be accessed directly.

### Front Desk Interface (`/front-desk`)
1. **Accessing the Interface**:
    - Navigate to the front desk interface and enter the access key to unlock the interface.
2. **Configuring Races**:
    - Here you can add races and assign drivers to cars. The race session are ordered by creation time from top to bottom. Meaning the top most race session is always the next upcoming one and is queued up in the RaceControl inteface. In order to prevent the receptionist from making changes once a race has started, the topmost race session disappears once a race has started.

### Race Control Interface (`/race-control`)
1. **Accessing the Interface**:
    - Enter the safety official access key to unlock the interface.
2. **Managing Races**:
    - Once the receptionist has added the first race session, it is automatically queued up in the RaceControl interface.
    - The session can be started by pressing the "Start Race" button.
    - The flag status can be changed using the flag mode buttons (Safe, Hazard, Danger, Finish).
    - The race session will change to "Finish" mode either when the timer runs out or the safety official presses the "Finish" flag. 
    - When in 'Finish' mode, the timer cannot be resumed. The only clickable button will be the "End Race" button.
    - Once the end race button is pressed, the race session will be cleared from RaceControl and the next race from the front desk interface will be queued up immediately, if there is another one. 

### Lap-line Tracker Interface (`/lap-line-tracker`)
- The lap line tracker interface is depended on the RaceControl interface to know which race session is currently active and on FrontDesk to get car information. Therefore, it is recommended to have the other two interfaces open before using this one.
1. **Accessing the Interface**:
    - Enter the observer access key to unlock the interface.
2. **Recording Lap Times**:
    - Once there is a race session with drivers defined in FrontDesk and RaceControl has been opened and has it selected, the lap line tracker interface will be populated with buttons that correspond to each car.
    - When the safety official starts the race, the timer for each car will begin to count up.
    - When a car crosses the lap line, the observer can press the button corresponding to the car to record the lap time. The lap times for each car are displayed in a table below the buttons and these are also updated in real time in the leader board interface.

### Leader Board Interface (`/leader-board`)
Note that the leader board is updated in real time from the lap line tracker interface. Therefore both of these interfaces should be open before using the leader board.
1. **Accessing the Interface**:
    - Open the `/leader-board` route in a browser.
2. **Viewing Leader Board**:
    - Displays the fastest lap times and current race standings in real time.
    - Includes race session timer and flag status.

### Next Race Interface (`/next-race`)

- Displays the upcoming race session drivers and their assigned car numbers.

### Race Countdown Interface (`/race-countdown`)

- Shows the timer for the current race session.

### Race Flags Interface (`/race-flags`)

- Displays the current flag status in full screen.
- Supports Safe, Hazard, Danger, and Finish flags.

## Error Handling

1. If an incorrect access key is entered, the system will delay for 500ms and display an error message.
2. If environment variables are not set, the server will fail to start and provide an error message.
---

## Notes
- Regarding data persistence: We have implemented a module called raceData.js that is used to store the race data in a JSON file. (racetrack/backend/server/data/races.json). This is intended to persist the data in case the backend is restarted during a race. If you are starting a fresh run of tests and restarting everything, it is recommended to delete the races.json file to start from a clean state. Otherwise you may have an ongoing countdown or lap timer that may resume while you do not have an ongoign race session or may experience other bugs.
- This application is an MVP.
- Ensure all devices accessing the interfaces are on the same network or use a tunneling service (e.g., ngrok) to expose the server.
- To run the command npm run dev the raceData.js file needs to be removed temporarily. Data will not persist in developer mode.
---

## Development and Contributions

Made by Oskar Kusmin, Sulev Sillaste, Jürgen Andessalu
