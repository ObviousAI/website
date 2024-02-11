// /utils/auth0.ts or /src/utils/auth0.ts
import { initAuth0 } from '@auth0/nextjs-auth0';
export default initAuth0({
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});

