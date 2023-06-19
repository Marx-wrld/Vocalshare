import { account, db, storage } from './appwrite';
import { ID } from 'appwrite';


//Filtering the users list to verify if the users details exists before granting access to the app
const checkUserFromList = async (email, router) => {
    try{
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
    try{
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
    try{
        await account.deleteSession('current');
        router.push("/");
        successMesssage("See you later!");
    }
    catch (error){
        console.log(error);
        errorMessage('Encountered an error');
    }
};