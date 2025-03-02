import { Client,Databases,ID, Query ,Storage} from "appwrite";
import config from "../config/config";
export class DBService{
         client=new Client();
         database;
         storage;
         constructor(){
              this.client.setEndpoint(config.appwrite_url).setProject(config.project_id);
              this.database=new Databases(this.client);
              this.storage=new Storage(this.client);
              
         }
        async createPost({title,slug,content,featuredImage,status,userId}){
            try{
                const imageUrl=this.uploadFile(featuredImage);
              return await this.database.createDocument(config.database_id,config.collection_id,slug,{title,content,imageUrl,status,userId});
            }catch(error){
                throw error;
            }
        }
        async updatePost({title,slug,content,featuredImage,status}){
            try{
              return await this.database.updateDocument(config.database_id,config.collection_id,slug,{title,content,featuredImage,status,userId});
            }catch(error){
                throw error;
            }

        }
        async deletePost({slug}){
            try{
              return await this.database.deleteDocument(config.database_id,config.collection_id,slug);
            }catch(error){
                throw error;
            }
        }

        async getPost({slug}){
            try{
               this.database.getDocument(config.database_id,config.collection_id,slug);
            }catch(error){
                throw error;
            }
        }
        async getAllPost(queries=[Query.equal('status','active')]){
            try{
              return await this.database.listDocuments(config.database_id,config.collection_id,queries);
            }catch(error){
                throw error;
            }
        }

        async uploadFile(file){
            try{
                return await this.storage.createFile(config.bucket_id
                    ,ID.unique(),
                    file)
            }catch(error){
                throw error;
            }
        }
        async deleteFile(fileId){
            try{
                await this.storage.deleteFile(config.bucket_id
                    ,fileId);
                    return true;
            }catch(error){
                console.error(error) ;
                return false;
            }
        }        

        async filePreview(fileId){
          try{
               return await this.storage.getFilePreview(config.bucket_id,fileId)
          }catch(error){
            console.error(error);
            return "";
          }
        }

}

const dbService=new DBService();
export default dbService