const Initial = () =>{

  {/* as this is using a cdn and you cant import, add 'React.' before useState or useEffect */}
  var [posts, setPosts] = React.useState([])
  var [selectedPost, setSelectedPost] = React.useState('')

  React.useEffect(() => {
    fetch('http://localhost/mock/wordpress/wp-json/wp/v2/posts')
        .then(x => x.json())
        .then(x => setPosts(x))
      .catch((err) => {
        alert(err);
      })
    }, [])
  return(
          <div>
             <h1>Blog.</h1>
                 {posts.map((post, index) => (
                  <div className="post-containers" id={"post-container-" + index}  key={index}>
                     <h2>{post.title.rendered}</h2>
                     {/* Whats this? Regex to take the '<p></p>' tags away from the post body- wordpress wraps the body of the post in this automatically 
                      this is just a demo so Regex is fine in my opinion - otherwise you could checkout html-react-parser (not with a cdn though) or use .split() on it or something but thats up to you                   
                     */}
                     <p>{selectedPost === index ? post.content.rendered.replace(/<\/p>/g, '').replace(/<p>/g, '') : post.excerpt.rendered.replace(/<\/p>/g, '').replace(/<p>/g, '').replace(/\[\&hellip\;\]/g, '...')}</p>
                     {/* This renders the body of the post instead of the excerpt when you select 'read more'*/}
                     <button className="readmore" onClick={() => {setSelectedPost(index)}}>Read More</button>
                  </div>
                ))}
         </div>

    )
}


    ReactDOM.render(<Initial />, document.getElementById('app-container'));
