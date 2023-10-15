import { enviroment } from 'src/app/enviroments/enviroment';

export const WEBSOCKET_ENDPOINT = `${enviroment.WS_BASE_URL}`;
export const WEBSOCKET_CREATE_TOPIC = '/topic/create';
export const WEBSOCKET_CREATE_PRIVATE_TOPIC = '/private';
export const WEBSOCKET_UPDATE_TOPIC = '/topic/update';
export const WEBSOCKET_NOTIFICATION_TOPIC = '/topic/notification';
export const WEBSOCKET_SEARCH_TICKET_TOPIC =
  '/topic/search-ticket-for-notification';
