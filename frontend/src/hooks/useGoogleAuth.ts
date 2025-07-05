import { useEffect, useCallback } from 'react';

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

interface UseGoogleAuthProps {
  clientId: string;
  onSuccess: (credentialResponse: GoogleCredentialResponse) => void;
  onError: () => void;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export const useGoogleAuth = ({ clientId, onSuccess, onError }: UseGoogleAuthProps) => {
  const initializeGoogle = useCallback(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: onSuccess,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  }, [clientId, onSuccess]);

  useEffect(() => {
    if (window.google) {
      initializeGoogle();
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google) {
          initializeGoogle();
          clearInterval(checkGoogle);
        }
      }, 100);

      return () => clearInterval(checkGoogle);
    }
  }, [initializeGoogle]);

  const signInWithGoogle = useCallback(() => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      onError();
    }
  }, [onError]);

  return { signInWithGoogle };
};