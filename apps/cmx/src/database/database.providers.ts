import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://bert-user:GSsSUD7faI8J4Ku3@novacluster-bsgyp.gcp.mongodb.net/commissioning?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true }),
  },
];

