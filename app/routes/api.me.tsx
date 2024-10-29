import { LoaderFunctionArgs, json } from '@remix-run/node';
import _ from 'lodash';
import { User } from '~/data';
import { getMe } from '~/data/user';
import { authenticator } from '~/services/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user) return json({user: {}, detail: {}});
  try {
    let detail: User = await getMe(user.token);
    console.log(`====user detail`, JSON.stringify(detail));
    
    return json({ user, detail});
  } catch (error: any) {
    return json({ user, detail: {}})
  }
};
