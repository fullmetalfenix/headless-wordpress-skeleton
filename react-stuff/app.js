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
		<h1>List of Post Titles</h1>
		 {console.log(this.state.jason)}
			{this.state.posts.map((posts, index) => (
		 <div>
			<h1>{posts.title.rendered}</h1>
		 </div>
		 )
	 )}
</div>
	 )
 }
}

ReactDOM.render(<Initial />, document.getElementById('app-container'));