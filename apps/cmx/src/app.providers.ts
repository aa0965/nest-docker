import { Connection } from 'mongoose';
import { deviceSchema } from './database/device.schema';

export const deviceProviders = [
  {
    provide: 'DEVICE_MODEL',
    useFactory: (connection: Connection) => connection.model('DEVICE', deviceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];