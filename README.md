# headless-wordpress-skeleton
Barebones two file headless wordpress setup using react via cdn that should take only a minute or two to set up. 

## Step one:
drop the index.html in the root folder
 - CDN for React / Babel included
 - Application container 
 
 Note: If your using xampp for local development you may have to open up your .htaccess file and add: 
 
 `DirectoryIndex index.html index.php`
 
 Whats this do? It gives your new index.html precedent over index.php, like you would find on most web servers out in the wild.
 
## Step Two:
drop the 'react-stuff' folder into the current theme folder *
 
 *Why did I do it this way? Because then I can go into the wordpress dash and edit my application code in the theme editor. This is just to play around with for now so I like the option to do everything through the WP admin area 
 

## Step Three

Change the instance of {{your url here}} to your url - this is making a call to the wp api to fetch your posts on component mount and loading it into the state object.

Thats it! It should be up and running




_Further information:_

### What else is going on? 
 There are 2 aditional things going on here you should be aware of:
  1. I only rendered the post exerpt (as a default wp setup does) but I added some code that will render the post body on "Read More" - Hows that work? When you click "read more" it triggers the renderBody function and sets the selectedPost to the index of the post, rendering the full post body.

  2. there is some regex to remove some default wordpress html tags (<p> tags specifically) that usually suround some of the data from the api.
