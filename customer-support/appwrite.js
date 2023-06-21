import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

client 
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

export const account = new Account(client);

export const db = new Database(client);

export const storage = new Storage(client);

//getting the support tickets from appwrite cloud
//The function below retrieves all the support tickets and groups them based on their status

export const getTickets = async (
        setOpenTickets,
        setInProgressTickets,
        setCompletedTickets
) => {
        try{
                const response = await db.listDocuments(
                        process.env.NEXT_PUBLIC_DB_ID,
                        process.env.NEXT_PUBLIC_TICKETS_COLLECTION_ID
                );
                const tickets = response.documents;
                const openTickets = tickets.filter((ticket) => ticket.status === "open");
                const inProgressTickets = tickets.filter( 
                        tickets.status === "in-progress"
                );
        const completedTickets = tickets.filter(
                (ticket) => ticket.status === "completed"
        );
        setCompletedTickets(completedTickets);
        setOpenTickets(openTickets);
        setInProgressTickets(inProgressTickets);
        }
        catch (error) {
                console.log(error);
        }
};