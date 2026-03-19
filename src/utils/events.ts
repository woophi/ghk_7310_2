import { LS, LSKeys } from '../ls';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: 'event', v: string, data?: Record<string, string>) => void;
  }
}

type Payload = {
  longread: string;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const datetime = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch('https://script.google.com/macros/s/1jdX0hy-RwvVVLdFE0G4zN5jUc8RKYPQvjA75fXOvxD7dfv2zIhzhA1iq/exec', {
      redirect: 'follow',
      method: 'POST',
      body: JSON.stringify({ datetime, ...payload, var: '7442_2', user_id: LS.getItem(LSKeys.UserId, 0) }),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error!', error);
  }
};
