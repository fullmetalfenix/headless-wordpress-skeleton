
class Initial extends React.Component{
    // initialize state and set posts.
      constructor(props) {
        super(props);
        this.state = {
          posts: [],
          selectedPost: '',
        };
      }
    // On component mount (to the dom) fetch the posts	
    componentDidMount(){
    // Replace '<url-to-your-wp-site>' with your site 	
    fetch('<your-site>/wp-json/wp/v2/posts')
        .then(x => x.json())
        .then(x => this.setState({posts: x}))
    } 
        // this method swaps between the exerpt and the full posts content
        renderBody(index){
            this.setState({selectedPost:index});
         }	
        render(){
    
    
            return(
          <div>
             <h1>Blog.</h1>
                 {this.state.posts.map((posts, index) => (
                  <div className="post-containers" id={"post-container-" + index}  key={index}>
                     <h2>{posts.title.rendered}</h2>
                     {/* Whats this? Regex to take the '<p></p>' tags away from the post body- wordpress wraps the body of the post in this automatically */}
                     <p>{ (this.state.selectedPost === index ? this.state.posts[index].content.rendered.replace(/<\/p>/g, '').replace(/<p>/g, '') : posts.excerpt.rendered.replace(/<\/p>/g, '').replace(/<p>/g, '').replace(/\[\&hellip\;\]/g, '...'))}</p>
                  </div>
                ))}
         </div>
         )
     }
    }
    
    ReactDOM.render(<Initial />, document.getElementById('app-container'));
