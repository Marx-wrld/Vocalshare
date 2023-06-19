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
        }else{
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
        await account.createEmailSeesion(email, password);

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

//protecting pages from unauthenticated users

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



