
Built by https://www.blackbox.ai

---

# Temperature Catalog

## Project Overview
Temperature Catalog is a project designed for handling temperature data using Node.js and MongoDB. It provides a RESTful API that allows users to add, update, delete, and retrieve temperature records categorized by region and date. 

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/temperature-catalog.git
   cd temperature-catalog
   ```

2. **Install dependencies**
   Make sure you have Node.js and MongoDB installed on your machine, then run:
   ```bash
   npm install
   ```

3. **Start MongoDB**
   Ensure that your MongoDB server is running. You can do this with:
   ```bash
   mongod
   ```

4. **Run the application**
   Start the server using:
   ```bash
   npm start
   ```
   The server will be running on [http://localhost:3000](http://localhost:3000).

## Usage
The API provides several endpoints for managing temperature records:

### Endpoints
- **Add a new temperature record**
  - **Method:** POST
  - **URL:** `/api/temperature`
  - **Body:** JSON, example:
    ```json
    {
      "region": "Region Name",
      "avgTemperature": 25,
      "precipitation": 100,
      "date": "2023-10-01"
    }
    ```

- **Delete a temperature record by ID**
  - **Method:** DELETE
  - **URL:** `/api/temperature/:id`

- **Update a temperature record by ID**
  - **Method:** PUT
  - **URL:** `/api/temperature/:id`
  - **Body:** JSON

- **Get temperature records by date**
  - **Method:** GET
  - **URL:** `/api/temperature?date=2023-10-01`

- **Get minimum temperature record by date**
  - **Method:** GET
  - **URL:** `/api/temperature/min/:date`

## Features
- **CRUD Operations:** Create, Read, Update, and Delete temperature records.
- **Date-based Queries:** Retrieve records based on specific dates.
- **Minimum Temperature Fetch:** Get the record with the minimum average temperature for specified dates.
- **CORS and Middleware Support:** Cross-origin resource sharing and body parsing for JSON data.

## Dependencies
The project relies on the following npm packages:
- **express**: ^4.18.2
- **mongoose**: ^7.3.1
- **cors**: ^2.8.5
- **body-parser**: ^1.20.2

These dependencies handle HTTP requests, MongoDB interactions, and data parsing.

## Project Structure
The project is organized as follows:

```
temperature-catalog/
├── package.json           # Contains metadata and dependencies
├── package-lock.json      # Locks down the dependency versions
└── server.js              # Main server file handling routes and database connections
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 engine
- [MongoDB](https://www.mongodb.com/) - A NoSQL database for high volume data storage

For any issues, features requests, or collaboration, feel free to contribute to the repository.