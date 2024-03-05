/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

import { connectToDatabase } from './db.js';
import ShortUrl from './models/shortUrl.js';


export const lambdaHandler = async (event, context) => {
    await connectToDatabase();

    const fullUrl = event.queryStringParameters && event.queryStringParameters.fullUrl;
    
    
    const newShortUrl = await ShortUrl.create({ full: fullUrl });

    const shortUrl = newShortUrl.short
    console.log('New ShortUrl created:', newShortUrl);

    return {
        statusCode: 200,
        headers: {
            Location: shortUrl.full,
          },
        body: JSON.stringify({
            message: 'ShortUrl created successfully',
            shortUrl: shortUrl,  // Include the shortUrl in the response
        }),
    };


};

export const RerouteHandler = async (event, context) => {
  await connectToDatabase(); // Ensure connection is ready

  try {
    const shortUrl = event.pathParameters.shortUrl;
    console.log(shortUrl)
    const foundUrl = await ShortUrl.findOne({ short:shortUrl }); // Use the correct field name
    console.log(foundUrl)

    if (foundUrl) {
      // Redirect logic using the retrieved long URL (replace with your implementation)
      return {
        statusCode: 302, // Found - redirect to the long URL
        headers: {
          Location: foundUrl.full,
        },
      };
    } else {
      // Handle the case where the short URL isn't found (replace with your implementation)
      return {
        statusCode: 404, // Not Found
        body: JSON.stringify({ error: 'Short URL not found' }),
      };
    }
  } catch (error) {
    console.log(error) // Handle errors centrally
  }
};


