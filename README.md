# URL Shortener API
## Overview
The URL Shortener API allows users to shorten URLs, redirect to the original URL using the shortened version, and track usage statistics such as the total number of clicks and the last accessed time. This API uses MongoDB to store URLs and access data, and it includes rate limiting to prevent abuse.

## Features
*Shorten URLs
*Redirect to original URLs using shortened links
*Track statistics (clicks and last access time) for shortened URLs
*Rate limiting to restrict excessive requests (100 requests per minute per IP)
*Deployed and available via a production URL



# 1. POST /shorten
Description: Shortens a given URL and returns the shortened version.

Request:

Method: POST
URL: /shorten
Headers:
Content-Type: application/json
Body:
json
Copy code
{
  "url": "https://example.com"
}
Response:

Success (200):
json
Copy code
{
  "shortUrl": "https://yourapp.com/abcd1234"
}
Error (400): Invalid URL
json
Copy code
{
  "error": "Invalid URL"
}


# 2. GET /:shortId
Description: Redirects to the original URL associated with the shortId.

Request:

Method: GET
URL: /:shortId
Example: /abcd1234
Response:

Success (302): Redirects to the original URL.
Error (404): If the shortId is not found.
json
Copy code
{
  "error": "Short URL not found"
}


# 3. GET /stats/:shortId
Description: Retrieves statistics for a specific shortened URL, including the number of clicks and the last access time.

Request:

Method: GET
URL: /stats/:shortId
Example: /stats/abcd1234
Response:

Success (200):
json
Copy code
{
  "clicks": 10,
  "lastAccessed": "2024-11-26T15:20:10.123Z"
}
Error (404): If the shortId is not found.
json
Copy code
{
  "error": "Short URL not found"
}


# 4. GET /
Description: Root endpoint to confirm that the service is running.

Request:

Method: GET
URL: /
Response:

Success (200): Returns status and server information.
json
Copy code
{
  "message": "Shorten URL app is working fine",
  "status": "Server is up",
  "now": "MM/DD/YYYY"
}


## Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
Install the dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add the following environment variables:

makefile
Copy code
MONGO_URI=your-mongodb-connection-string
PORT=5000
Start the server:

bash
Copy code
npm start
The server will start at http://localhost:5000.

# Deployment
This API is deployed on a cloud hosting platform like Render, Railway, or Vercel. You can replace https://yourapp.com with the actual deployed URL in the responses.

To deploy:

Set up the environment variables for MongoDB and other configurations on your hosting service.
Push the code to your repository.
Deploy the app and ensure the deployed URL is accessible.
Rate Limiting
This API includes a rate-limiting feature that restricts each IP address to 100 requests per minute. If the limit is exceeded, the API returns a 429 Too Many Requests error with the following response:


# Database
The application uses MongoDB to store shortened URLs and their corresponding usage statistics. Each entry in the database stores:

The original URL
The shortened shortId
The number of times the shortened URL has been clicked (clicks)
The timestamp of the last access (lastAccessed)
Sample MongoDB Document
json
Copy code
{
  "_id":{"$oid":"674682bc70d090c2d36396ef"},
  "originalUrl":"https://example.com",
  "shortId":"5b02bf94d3ea",
  "clicks":{"$numberInt":"2"},
  "lastAccessed":{"$date":{"$numberLong":"1732674360700"}},
  "__v":{"$numberInt":"0"}
}

# Error Handling
The API provides appropriate error messages for invalid requests:

Invalid URL: If the URL provided to the /shorten endpoint is not valid, the response will be:

Future Enhancements
Custom short URLs: Allow users to specify custom aliases for their shortened URLs.
Expiration: Add the option to set expiration dates for shortened URLs.
Analytics Dashboard: Provide a more comprehensive dashboard to visualize click statistics.
License
This project is licensed under the MIT License.

# Deployed link
https://shorten-url-five-opal.vercel.app/ 

