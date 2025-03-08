import config from "../config/config";
import { Client,Account,ID} from "appwrite";

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwrite_url)
        .setProject(config.project_id);
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name}) {
        try{
         const userAccount= await this.account.create(ID.unique(),email,password,name);
         if(userAccount){
            return this.login({email,password});

         }else{
            return userAccount
         }
       
        }catch(error){
            throw error;
        }
        
    }

    async login({email,password}){
        try{
          return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            const data= await this.account.get();
            console.log(data);
            return data;
        }catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
       
    }
    async logout(){
        try{
           return await this.account.deleteSessions("current")
        }catch(error){
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService=new AuthService();
export default authService