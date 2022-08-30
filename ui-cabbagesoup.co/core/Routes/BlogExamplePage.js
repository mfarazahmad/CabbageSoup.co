import React from 'react';
import { useRouter } from 'next/router';

function BlogExamplePage(props) {

    const router = useRouter();
    
    return (

        <main className="page" id="blogs">
            <section className="blogPostIntro">
                <div className="OverAllBlogTitle" >Blog<span className="dotBlog">.</span></div>
                <div className="BlogPostTitle">How Artificial Intelligence Can Change The World.</div>
            </section>
            <section className="blogPostMainImagePlaceHolder">
                <>
                    <a ><img alt="stack overflow" src='./img/traveling.jpg' className="blogPostMainImage"></img></a>
                </>
            </section>
            <section className="BlogContent">
                <div className="SectionTitle">Section title </div>
                <div className="SectionDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                     Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                      Praesent mauris. Fusce nec tellus sed augue semper porta.
                  Mauris massa. Vestibulum lacinia arcu eget nulla. </div>
                <div className="SectionTitle">Section title </div>
                <div className="SectionDescription">Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.
                Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
                  Mauris massa. Vestibulum lacinia arcu eget nulla. </div>
                <div className="SectionTitle">Section title </div>
                <div className="SectionDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                     Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                      Praesent mauris. Fusce nec tellus sed augue semper porta.
                  Mauris massa. Vestibulum lacinia arcu eget nulla. </div>
            </section>

        </main >

    );
}


export default BlogExamplePage;