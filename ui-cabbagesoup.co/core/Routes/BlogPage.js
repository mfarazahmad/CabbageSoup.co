import React from 'react';
import { useRouter } from 'next/router';

function BlogPage(props) {

    const router = useRouter();

    return (

        <main className="page" id="blogs">
            <section className="blogHomepage">
                <div className="OverAllBlogTitle" >Blog<span className="dot">.</span></div>
                <div className="RecentBlogPost" onClick={() => {props.closeMenu; router.push('/exampleblog');}}>
                    <>
                        <a ><img alt="stack overflow" src='./img/traveling.jpg' className="recentBlogPostImage"></img></a>
                    </>
                    <div className="RecentBlogPostInformation">
                        <div className="RecentBlogPostTitle">How AI can change the world.</div>
                        <div className="RecentBlogPostDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                     Sed cursus ante dapibus diam. Sed nisi.</div>
                    </div>
                </div>
            </section>
            <section className="blogPostsDisplay">
                <div className="otherBlogs">
                    <div className="allBlogPosts">
                        <img alt="stack overflow" src='./img/traveling.jpg' className="otherBlogPostsImages "></img>
                        <div >
                            <div className="otherBlogsTitles">How AI can change the world.</div>
                            <div className="OtherBlogsDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                     Sed cursus ante dapibus diam. Sed nisi.</div>
                        </div>
                    </div>

                    <div className="allBlogPosts">
                        <img alt="stack overflow" src='./img/traveling.jpg' className="otherBlogPostsImages "></img>
                        <div >
                            <div className="otherBlogsTitles">How AI can change the world.</div>
                            <div className="OtherBlogsDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                     Sed cursus ante dapibus diam. Sed nisi.</div>
                        </div>
                    </div>
                    <div className="allBlogPosts">
                        <img alt="stack overflow" src='./img/traveling.jpg' className="otherBlogPostsImages "></img>
                        <div >
                            <div className="otherBlogsTitles">How AI can change the world.</div>
                            <div className="OtherBlogsDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                     Sed cursus ante dapibus diam. Sed nisi.</div>
                        </div>
                    </div>
                    <div className="allBlogPosts">
                        <img alt="stack overflow" src='./img/traveling.jpg' className="otherBlogPostsImages "></img>
                        <div >
                            <div className="otherBlogsTitles">How AI can change the world.</div>
                            <div className="OtherBlogsDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                     Sed cursus ante dapibus diam. Sed nisi.</div>
                        </div>
                    </div>
                    <div className="allBlogPosts">
                        <img alt="stack overflow" src='./img/traveling.jpg' className="otherBlogPostsImages "></img>
                        <div >
                            <div className="otherBlogsTitles">How AI can change the world.</div>
                            <div className="OtherBlogsDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                     Sed cursus ante dapibus diam. Sed nisi.</div>
                        </div>
                    </div>
                    <div className="allBlogPosts">
                        <img alt="stack overflow" src='./img/traveling.jpg' className="otherBlogPostsImages "></img>
                        <div >
                            <div className="otherBlogsTitles">How AI can change the world.</div>
                            <div className="OtherBlogsDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                     Sed cursus ante dapibus diam. Sed nisi.</div>
                        </div>
                    </div>
                </div>
            </section>
        </main >

    );
}


export default BlogPage;