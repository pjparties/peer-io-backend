# Basic template to get started with backend server in Node / Express

This is a basic template to help you get started with building a backend server using Node.js and Express.

### add .env file and update package.json file accordingly to accomodate for sql and nosql

## Technologies Used

- Node.js
- Express
- SQL (can be changed to NoSQL)
- Multer (for middlewares)
- Cloudinary (for cloud hosting middlewares)

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org)
- Express: Install Express globally by running `npm install -g express`

## Getting Started

1. Clone this repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## Configuration

- SQL Database: Configure your SQL database connection in the `config.js` file.
- NoSQL Database: If you want to use a NoSQL database, update the code accordingly.
- Multer: Configure Multer middleware options in the `multer.js` file.
- Cloudinary: Configure Cloudinary middleware options in the `cloudinary.js` file.

## Usage

- Define your routes and controllers in the `routes` directory.
- Use the `app.js` file to configure your Express server.
- Start the server by running `npm start`.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
