# Smart Study Assistant — Backend

Backend service for the Smart Study Assistant System (SSAS). This repository contains the Node.js/Express backend that provides APIs and data storage for the Smart Study Assistant application.

## Contents of this repository
- .gitignore
- package.json
- package-lock.json
- server.js (application entrypoint)
- schema.txt (database schema and model descriptions)
- src/ (application source code)

> Note: The detailed application code is under the `src/` directory and `server.js` is the main entry file.

## Features (high level)
- Express-based REST API
- MongoDB integration (mongoose dependency present)
- Authentication using JSON Web Tokens (jsonwebtoken)
- File upload support (multer)
- Email sending support (nodemailer)
- Integration with Google generative AI SDK (for any AI-powered features)
- Typical middleware: CORS, logging (morgan), async helpers

## Requirements
- Node.js 18+ recommended
- npm
- A running MongoDB instance (local or hosted)
- Environment variables (see below)

## Installation
1. Clone the repository:
   git clone https://github.com/prathamdalmia/Smart-Study-Assistant-backend.git
2. Install dependencies:
   cd Smart-Study-Assistant-backend
   npm install

## Environment variables
Create a `.env` file in the project root (not committed) and set the variables the application needs. Typical variables used in similar setups include:
- PORT — port the server should listen on (default: 3000)
- MONGODB_URI — MongoDB connection string
- JWT_SECRET — secret for signing JWT tokens
- EMAIL_HOST / EMAIL_PORT / EMAIL_USER / EMAIL_PASS — for nodemailer (if email features are used)
- GOOGLE_API_KEY / GOOGLE_PROJECT_ID / GOOGLE_LOCATION — for @google/generative-ai usage (if applicable)

Check the code under `src/` and `server.js` for the exact environment variable names expected by this project.

## Available scripts (from package.json)
- npm start — run the production server (node server.js)
- npm run dev — run in development with nodemon

## Running the app
Start in development:
npm run dev

Start in production:
npm start

After startup the server will listen on the port configured via the PORT env var (or the default configured in the code). Check `server.js` for the default port and the app entry logic.

## Database schema
A textual description of the database schema is available in `schema.txt` at the repository root. Use that as the reference for collections, fields, and relationships.

## Where to look next
- `server.js` — application entrypoint and top-level middleware/route mounts.
- `src/` — main application code (controllers, models, routes, middlewares).
- `schema.txt` — database layout and model notes.

## Dependencies (high level)
Some notable dependencies (see package.json for the full list and versions):
- express
- mongoose
- jsonwebtoken
- bcrypt
- multer
- nodemailer
- cors
- morgan
- dotenv
- @google/generative-ai
- axios

## Contributing
- Open an issue to discuss changes or to report bugs.
- Fork the repo, create a feature branch, make changes, and open a pull request.

## License
This project uses the ISC license (as declared in package.json).

## Author / Contact
Author: Pratham

If you want more detailed documentation (for example, automatic API reference, endpoint list, or a runnable example with sample environment variables), tell me which area you'd like expanded and I will draft it using the repository files (for example, I can extract actual endpoints from the code and add example requests).
