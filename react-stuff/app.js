class Initial extends React.Component{

	

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
	selectedPost: '',
    };
  }
	
componentDidMount(){
fetch('http://tryingout.s437.sureserver.com/wp-json/wp/v2/posts')
	.then(x => x.json())
	.then(x => this.setState({posts: x}))
} 

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
			<p >{
	(this.state.selectedPost === index ? this.state.posts[index].content.rendered.replace(/<\/p>/g, '').replace(/<p>/g, '') : posts.excerpt.rendered.replace(/<\/p>/g, '').replace(/<p>/g, '').replace(/\[\&hellip\;\]/g, '...'))
				
								  
			}</p>
			<button onClick={() => { this.renderBody(index) }}>Read More</button>
		 </div>
		 )
	 )}
</div>
	 )
 }
}

ReactDOM.render(<Initial />, document.getElementById('app-container'));
