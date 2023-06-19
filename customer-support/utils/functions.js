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
            errorMessage("Unauthourized..Kindly, Contact Management.");
        }
    } catch (error) {
        errorMessage('An error occurred!');
        console.error(error);
    }
};


