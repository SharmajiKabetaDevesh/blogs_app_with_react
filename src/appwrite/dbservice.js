import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

export class DBService {
    client = new Client();
    database = null;
    storage = null;

    constructor() {
        this.client.setEndpoint(config.appwrite_url).setProject(config.project_id);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, image, status, userId }) {
        try {
            console.log("Appwrite service :: createPost :: ", { title, slug, content, image, status, userId });
            console.log("image:",image[0]);
            const imageurl= await this.uploadFile(image[0]).then((res)=>res.$id);
            console.log("imageurl:",imageurl);
            return await this.database.createDocument(
                config.database_id,
                config.collection_id,
                slug,
                { title, content, imageurl, status, userId }
            );
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug,{ title, content, image, status }) {
        try {
            return await this.database.updateDocument(
                config.database_id,
                config.collection_id,
                slug,
                { title, content, image, status }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost( slug ) {
        try {
            console.log("Appwrite service :: deletePost ::slug: ", slug);
            await this.database.deleteDocument(config.database_id, config.collection_id, slug);
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost({ slug }) {
        try {
            console.log("Appwrite service :: getPost :: slug ", slug);
            return await this.database.getDocument(config.database_id, config.collection_id,slug);
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getAllPost(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(config.database_id, config.collection_id, queries);
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            console.log("Appwrite service :: uploadFile :: ", file);
            return await this.storage.createFile(config.bucket_id, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(config.bucket_id, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false;
        }
    }

    async filePreview(fileId) {
        try {
            const prom= await this.storage.getFilePreview(config.bucket_id, fileId);
            console.log("Appwrite service :: filePreview :: output: ", prom.href);
            return prom.href;
        } catch (error) {
            console.log("Appwrite serive :: filePreview :: error", error);
            return "";
        }
    }
}

const dbService = new DBService();
export default dbService;
