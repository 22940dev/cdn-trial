# Using the CDN

The CDN is hosted at `https://cdn.nhcarrigan.com`. The root path will take you to a very boring file, but will allow you to verify that your connection to the CDN is working.

## Listing Images

To view all available images on the CDN, visit the [`/files` endpoint](https://cdn.nhcarrigan.com/files). Each file on the CDN will be listed there, with a clickable link to navigate directly to the file.

## Using Images

Images on the CDN can be embedded anywhere, such as Discord or your webpage. If you run in to an issue embedding images, reach out to us on our [chat server](http://chat.nhcarrigan.com).

## Adding Images

The repository has a single image - this is for demonstration and testing purposes _only_. Please do not submit pull requests to add images to this repository as they will not be accepted.

If you would like us to host an image for you, please reach out on our [chat server](http://chat.nhcarrigan.com).

## Rate Limits

The CDN has a global rate limit on all routes of 60 requests per minute. Rate limit information is sent back in the response headers as:

- `X-RateLimit-Limit`: The total number of requests per reset schedule.
- `X-RateLimit-Remaining`: The number of requests you can still make before the next reset.
- `X-RateLimit-Reset`: The Unix timestamp indicating the next reset.
