import { createReactQueryHooks } from '@trpc/react';

import type { AppRouter } from '@root/backend/router';

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
