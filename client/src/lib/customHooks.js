import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from './common';
import { APP_ROUTES } from './constants';
import { useNavigate } from 'react-router-dom';

export function useUser(checkOnly = false) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticatedUser();
      if (!authenticated) {
        if(!checkOnly) {
          navigate(APP_ROUTES.SIGN_IN);
        }
        return;
      }
      setUser(user);
      setAuthenticated(authenticated);
    }
    getUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { user, authenticated };
}