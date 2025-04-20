const FirstPost = ({ post, selectedPost, setSelectedPost }) => (
  <div className="post-containers" id={"first-container"}>
    <h2>{post.title.rendered}</h2>

    <div>
      {selectedPost === 0 ? (
        post.content.rendered.replace(/<\/p>/g, "").replace(/<p>/g, "")
      ) : (
        <span>
          {post.excerpt.rendered
            .replace(/<\/p>/g, "")
            .replace(/<p>/g, "")
            .replace(/\[\&hellip\;\]/g, "...")}
          <button className="readmore" onClick={() => setSelectedPost(0)}>
            Read More
          </button>
        </span>
      )}
    </div>
  </div>
);

const RemainingPosts = React.lazy(() => {
  return new Promise(resolve => {
    const Component = ({ posts, selectedPost, setSelectedPost }) => (
      <div>
        {posts.slice(1).map((post, index) => (
          <div className="post-containers" id={"post-container-" + (index + 1)} key={index + 1}>
            <h2>{post.title.rendered}</h2>
            <p>
              {selectedPost === (index + 1)
                ? post.content.rendered.replace(/<\/p>/g, '').replace(/<p>/g, '')
                : post.excerpt.rendered.replace(/<\/p>/g, '').replace(/<p>/g, '').replace(/\[\&hellip\;\]/g, '...')}
            </p>
            <button className="readmore" onClick={() => setSelectedPost(index + 1)}>
              Read More
            </button>
          </div>
        ))}
      </div>
    );
    resolve({ default: Component });
  });
});

const Initial = () => {
  {
    /* as this is using a cdn and you cant import, add 'React.' before useState or useEffect */
  }
  var [posts, setPosts] = React.useState([]);
  var [selectedPost, setSelectedPost] = React.useState("");
  const [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    fetch("http://localhost/gatsbywp/wordpress/wp-json/wp/v2/posts")
      .then((x) => x.json())
      .then((x) => setPosts(x))
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <div className="blog-container">
      <h1>Blog.</h1>
      {posts.length > 0 && (
        <FirstPost
          post={posts[0]}
          index={0}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}

      {showMore && posts.length > 1 && (
        <React.Suspense fallback={<div>Loading more posts...</div>}>
          <RemainingPosts 
            posts={posts} 
            selectedPost={selectedPost} 
            setSelectedPost={setSelectedPost} 
          />
        </React.Suspense>
      )}

      {!showMore && posts.length > 1 && (
        <button className="load-more-button" onClick={() => setShowMore(true)}>Load More Posts</button>
      )}
    </div>
  );
};

ReactDOM.render(<Initial />, document.getElementById("app-container"));
