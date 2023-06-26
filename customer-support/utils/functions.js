import { account, db, storage } from './appwrite';
import { ID } from 'appwrite';


//Filtering the users list to verify if the users details exists before granting access to the app
const checkUserFromList = async (email, router) => {
    try {
        const response = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_USERS_COLLECTION_ID
        );
        const users = response.documents;
        const result = users.filter((user) => user.email === email);

        if (result.length > 0) {
            successMessage('Welcome back!');
            router.push("/staff/dashboard");
        }
        else {
            errorMessage("Unauthourized! Kindly, Contact Management.");
        }
    } catch (error) {
        errorMessage('An error occurred!');
        console.error(error);
    }
};


//Authenticating the user

export const login = async (email, password, router) => {
    try {
        //Appwrite login method
        await account.createEmailSession(email, password);

        //calls the filter function
        await checkUserFromList(email, router);
    }
    catch (error){
        console.log(error);
        errorMessage("Invalid Credentials!");
    }
};

//Logging out users with { account.deleteSession() } method

export const logOut = async (router) => {
    try {
        await account.deleteSession('current');
        router.push("/");
        successMesssage("See you later!");
    }
    catch (error){
        console.log(error);
        errorMessage('Encountered an error');
    }
};

//Protecting pages from unauthenticated users

export const checkAuthStatus = async (setUser, setLoading, router) => {
    try {
        const response = await account.get();
        setUser(response);
        setLoading(false);
    } 
    catch (err) {
        router.push("/");
        console.error(err);
    }
};

//Adding new staff - Adding a code to accept a user's name, email, password when they submit the form

const generateID = () => Math.random().toString(36).substring(2, 24);

export const addUser = async (name, email, password) => {
    try {

        //creates a new account on appwrite auth

        await account.create(generateID(). email, password, name);

        //Adds the user details to the user's database
        awaitdb.createDocument(
            process.nv.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
            ID.unique(),
            { user_id: generateID(), name, email }
        );
        successMessage('User added successfully!');
    }
    catch (error) {
        consoe.log(error);
    }
};

//Getting the staff list 

export const getUsers = async (setUsers) => {
    try {
        const response = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_USERS_COLLECTION_ID
        );
    }
    catch (error) {
        console.log(error);
    }
};

//Removing users/Staff

export const deleteUser = async (id) => {
    try {
        await db.deleteDocument(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
            id
        );
        successMessage('User removed!');
    }
    catch (error) {
        console.log(error);
        errorMessage('Encountered an error!');
    }
};


//function that accepts all the ticket's details and ensures it works perfectly whether or not the customer uploads a screenshot of the problem they're facing

export const sendTicket = async (name, email, subject, message, attachment) => {
    //the function createTicket accepts all the tickets attributes and creates a new document on the Appwrite cloud
    //the file_url has a default url value since uploading an attachment is optional

    const createTicket = async (file_url = 'https://www.google.com') => {
        try{
            const response = await db.createDocument(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_TICKETS_COLLECTION_ID,
                ID.unique(),
                {
                    name,
                    email, 
                    subject: message,
                    status: "open",
                    //the messages array attribute creates a new structure for the live chatting feature. It converts the content on the customer info into JSON string and adds it to the messages array
                    messages: [
                        JSON.stringify({
                            id: generateID(),
                            content: message,
                            admin: false, 
                            name: "Customer"
                        }),
                    ],
                    attachment_url: file_url,
                    access_code: generateID()
                }
            );
            //send notifications to the customer
            console.log("RESPONSE >>>", response);
            successMessage("Ticket created!")
        }
        catch (error){
            errorMessage("Encountered saving Ticket");
        }
    };

    if (attachment !== null){
        //the if else code block checks if the customer uploaded an image. if true, the code uploads the image to the cloud storage, retrieves its URL, and passes it into the createTicket function otherwise the function uses the default value "https://www.google.com" as the attachment_url 
        try {
            const response = await storage.createFile(
                process.env.NEXT_PUBLIC_BUCKET_ID,
                ID.unique(),
                attachment
            );
            const file_url = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}&mode=admin`;

            //creates ticket with its image
            createTicket(file_url);
        }
        catch (error){
            errorMessage("Error uploading the image");
        }
    }
        else{
            //creates ticket even without an image
            await createTicket();
        }
    };
    

    //function to update the ticket status
    //updating the status of a ticket using the values "open, in-progress and completed"

    export const updateTicketStatus = async (id, status) => {
        try {
            await db.updateDocument(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT-PUBLIC_TICKETS_COLLECTION_ID,
                id,
                {status}
            );
            successMessage("Status updated, refresh page!");
        }
        catch (error) {
            console.log(error);
            errorMessage("Encountered an error!");
        }
    };

    //Adding the live-chatting feature to our app.
    //This page wil require an access code on page load but doesn't require authentication to access the page. We'll run the code snippet below when a user sends a message.

    export const sendMessage = async (text, docId) => {
        //getting the ticket id 
        const doc = await db.getDocument(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_TICKETS_COLLECTION_ID,
            docId
        );

        try {
            //getting the user's object(admin)
            const user = await db.updateDocument(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_TICKETS_COLLECTION_ID,
                docId,
                {
                    messages: [
                        ...doc.messages,
                        JSON.stringify({
                            id: generateID(),
                            content: text,
                            admin: true,
                            name: user.name,
                        }),
                    ],
                }
            );

            //message was added successfully section
            if (result.$id) {
                successMessage('Message sent!');
                //emails the customer with access code and chat URL
            }
            else {
                errorMessage("Error try sending your message!");
            }
        } 
        catch (error) {
            
            //means the user is a customer

            const result = await db.updateDocument(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_TICKETS_COLLECTION_ID,
                docId,
            {
                messages: [
                    ...doc.messages,
                    JSON.stringify({
                        id: generateID(),
                        content: text,
                        admin: false,
                        name: "Customer",
                    }),
                ],
            }
            );
            if (result.$id) {
                successMessage("Message sent!");

                //notify staff via notifications

            } 
            else{
                errorMessage("Error! Try resending your message");
            }
        }
    };


    export const getTickets = async(
        setOpenTickets,
        setInProgressTickets,
        setCompletedTickets
    ) => {
        try {
            const response = await db.listDocuments(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_TICKETS_COLLECTION_ID
            );
            const tickets = response.documents;
            const openTickets = tickets.filter((ticket) => ticket.status === 'open');
            const inProgressTickets = tickets.filter(
                (ticket) => ticket.status === 'in=progress'
            );
            const completedTickets = tickets.filter(
                (ticket) => ticket.status === 'completed'
            );
            setCompeletedTickets(completedTickets);
            setOpenTickets(openTickets);
            setInProgressTickets(inProgressTickets);
        }
        catch (error) {
            console.log(error);
        }
    }