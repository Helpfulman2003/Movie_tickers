import { createClient } from 'redis';

const client = createClient();

client.connect();

client.on('error', (err) => {
  console.error('Error occurred:', err);
});

export default client;
