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
         return await this.account.create(ID.unique(),email,password,name);
       
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
            throw error;
        }
       
    }
    async logout(){
        try{
           return await this.account.deleteSessions("current")
        }catch(error){
            throw error;
        }
    }
}

const authService=new AuthService();
export default authService