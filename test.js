const appwrite_url='https://cloud.appwrite.io/v1'
const project_id="67b92df3000b35ccf1c1"
const database_id="67b933da0030d336b882"
const collection_id="67b933f9002877c1748e"
const bucket_id="67b934e4001fe23db732"

import { Client, Databases, ID,Storage } from "appwrite";

const client=new Client().setEndpoint(appwrite_url).setProject(project_id);
const database = new Databases(client);
const storage = new Storage(client);


const databases = new Databases(client);

const promise = databases.createDocument(
    database_id,
    collection_id,
    ID.unique(),
    { title:"boy running on his own",
        
        content:"life is brutla ",
        
        
        image:"none",
        
        
        status:"active",
      
        userId:"grftht4h545ghh" }
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});

