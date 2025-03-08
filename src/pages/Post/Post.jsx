import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../../appwrite/dbservice"
import Button from "../../components/Button/Button"
import Container from "../../components/Container/Container"
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
       console.log("Post :: slug :",slug);
    const userData = useSelector((state) => state.authSliceReducer.userData);
    const [url,seturl]=useState(null);
    const isAuthor = post && userData ? post.userId === userData.userData.$id : false;

    useEffect(() => {
        if (slug) {
            dbService.getPost({slug}).then((post) => {
                if (post){
                     setPost(post);
                     dbService.filePreview(post.imageurl).then((url) => {
                        seturl(url);
                    });
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        console.log("Post :: deletePost :: post", post);
        console.log("Post :: deletePost :: postId", post.$id);
        dbService.deletePost(post.$id).then((status) => {
            if (status) {
                dbService.deleteFile(post.imageurl);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={url}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
