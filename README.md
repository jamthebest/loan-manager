# Loan Manager

A full-stack web app to manage loans.

Developed with ReactJs and NestJs.

This application allows you to manage your contacts, loans, and payments with simple screens and an intuitive interface, making it easy to keep track of all your financial activities in one place.

## File Structure
### Backend folder
The backend folder is structured as follows:
- **auth**: This folder contains the services, controllers, strategies, and guards for managing authentication.
- **util**: This folder contains the **\`constants.ts\`** file which contains the constants used throughout the application.
- **entities**: This folder contains the entities for the *contacts*, *loans*, *payments*, and *users*.

### Frontend folder
The frontend folder is structured as follows:
- **common**: This folder contains the **\`EventBus\`** file used for authentication.
- **components**: This folder contains custom components used in the application.
- **pages**: This folder contains the pages used in the application.
- **redux**: This folder contains the models for managing states.
- **services**: This folder contains the files for the authentication service.
- **types**: This folder contains the *User* type file.
- **util**: This folder contains the **\`api.ts\`** file that exports the *API_URL* variable.


## Installation
### Backend
1. Clone the repository.
2. Install dependencies using **\`npm install\`**.
3. Run **\`npm run start:dev\`** to start the backend server.
4. Navigate to `/docs` to see the API Swagger documentation.

### Frontend
1. Navigate to the frontend folder **\`cd frontend\`**.
2. Install dependencies using **\`npm install\`**.
3. Create a **\`.env\`** file in the root folder following the **\`.env.example\`** file.
4. Run **\`npm start\`** to start the frontend server.


## Usage
After installing the project, you can use it to manage your contacts, loans, and payments with simple screens and an intuitive interface. The project is built with React on the frontend and NestJs on the backend.

## Live Preview
### Live API
https://loan-manager-api.onrender.com/docs

### Live client
https://loan-manager.onrender.com/