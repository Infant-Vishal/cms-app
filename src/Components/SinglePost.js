import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../SanityClient.js";
import imageUrlBuilder from "@sanity/image-url";
import "../Styles/SinglePost.css";
import SanityBlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();
  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}" ] {
            title,
            slug,
            mainImage {
              asset -> {
                _id,
                url
              }
            },
            publishedAt,
            body,
            "authorName": author -> name,
            "authorImage": author -> image
      }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singlePost) return <div>Loading</div>;

  console.log("I am single post page", singlePost);
  return (
    <div className="d-flex flex-row justify-content-center">
      <div>
        <div className="mt-5">
          <h1 className="single-post-heading">{singlePost.title}</h1>
          <div className="single-post-content-container">
            <img
              src={singlePost.mainImage.asset.url}
              alt={singlePost.title}
              className="single-post-image"
            />
            <SanityBlockContent
              blocks={singlePost.body}
              className="single-post-body-content"
              projectId="bew4tfi1"
              dataset="production"
            />
          </div>
        </div>
        <div
          id="author-details"
          className="d-flex flex-row  author-details-container"
        >
          <img
            src={urlFor(singlePost.authorImage).url()}
            className="single-post-author-image"
            alt={singlePost.authorName}
          />
          <div>
            <h6 className="ml-4 mt-3">
              Author name:{" "}
              <span className="single-post-author-name">
                {singlePost.authorName}
              </span>
            </h6>
            <h6 className="ml-4">
              Published on:{" "}
              {new Date(singlePost.publishedAt).toLocaleDateString()}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
