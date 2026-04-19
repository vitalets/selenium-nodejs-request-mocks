import { setupFetchInterceptor } from 'request-mocking-protocol/fetch';

setupFetchInterceptor(async () => {
  const { headers } = await import('next/headers.js');
  return headers();
});
