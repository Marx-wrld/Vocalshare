import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

Client .setEndpoint("https://cloud.appwrite.io/v1")
       .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

//  This enables us interact with the authentication, file storage and database features
export const account = new Account(client);

export const db = Databases(client);

export const storage = new Storage(client);

