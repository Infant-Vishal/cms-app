import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../SanityClient";
import "../Styles/Posts.css";

const Posts = () => {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        previewContent,
        mainImage{
            asset->{
                _id,
                url
            },
            alt
        },
        publishedAt,
    body
      }`
      )
      .then((data) => setPostData(data))
      .catch(console.error);
  }, []);

  console.log("post data", postData);
  return (
    <>
      {/* med-contents */}
      {postData?.map((post, index) => {
        return (
          <>
            <div className="d-flex flex-row pl-5">
              <div className="med-update-card">
                <Link
                  to={"/post/" + post.slug.current}
                  key={"/post/" + post.slug.current}
                >
                  <div className="post-image-wrapper">
                    <img
                      src={post.mainImage.asset.url}
                      key={post.mainImage.asset["_id"]}
                      alt={post.title}
                      className="post-image blur"
                    />
                    <div className="post-read-more-comment fade">
                      Tap to Read more
                    </div>
                  </div>
                </Link>

                <div className="post-content-container">
                  <h6 key={index} className="post-heading">
                    {post.title}
                  </h6>
                  <p>{post.previewContent}</p>
                  <strong>
                    Published on
                    <span className="updated-date">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </strong>
                  <Link
                    to={"/post/" + post.slug.current}
                    key={"/post/" + post.slug.current}
                  >
                    <br />
                    <button className="btn btn-primary mt-4">Read more</button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Posts;
