class Initial extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      hello: 'true',
	  posts: [],
    };
  }
	
componentDidMount(){
fetch('http://tryingout.s437.sureserver.com/wp-json/wp/v2/posts')
	.then(x => x.json())
	.then(x => this.setState({posts: x}))
} 
	render(){
	 return(
	 <div>
		<h1>Blog.</h1>
		 {console.log(this.state.posts)}
			{this.state.posts.map((posts, index) => (
		 <div className="post-containers"  key={index}>
			<h2>{posts.title.rendered}</h2>
			<p>{posts.content.rendered.replace(/<\/p>/g, '').replace(/<p>/g, '')}</p>
		 </div>
		 )
	 )}
</div>
	 )
 }
}

ReactDOM.render(<Initial />, document.getElementById('app-container'));
