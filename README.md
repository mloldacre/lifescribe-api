<h1 id="lifescribe">LifeScribe</h1>

[Here's the website](https://lifescribe.vercel.app/)

<h2 id="what-is-lifescribe">What is LifeScribe?</h2>
<p>LifeScribe is an online web journal application in which users are able to log in and enter their thoughts (scribbles) and review them by day and time entered!</p>
<h2 id="prerequisites">Prerequisites</h2>
<p>Lifescribe requires Node.js 12.18+ to run.</p>
<h2 id="installing">Installing</h2>
<p>Lifescribe requires Node.js 12.18+ to run. Install the dependencies and devDependencies then start the server.</p>
<pre><code>npm install
</code></pre>
<h2 id="running-the-tests">Running The Tests</h2>
<p>To run front-end or back-end tests, simply run <code>npm t</code> in the terminal.</p>
<h2 id="schema">Schema</h2>
<h3 id="user">User</h3>
<pre><code>{
    id: {
	    type: Integer,
	    required: true,
	    unique: true
	    },
	first_name: {
	    type: Text,
	    required: true,
	    unique: false
	    },
	last_name: {
	    type: Text,
	    required: true,
	    unique: false
	    },
	 username: {
	    type: Text,
	    required: true,
	    unique: true
	    },
	 password: {
	    type: Text,
	    required: true,
	    unique: false
	    },
	 email: {
	    type: Text,
	    required: true,
	    unique: true
	    },
	 date_created: {
	    type: TimestampTZ,
	    required: true,
	    unique: false,
	    default: TimestampTZ.now
	    },
	 date_modified: {
	    type: TimestampTZ,
	    required: false,
	    unique: false
	    },
}
</code></pre>
<h3 id="scribe">Scribe</h3>
<pre><code>{
	id: {
	    type: Integer,
	    required: true,
	    unique: true
	    },
	date_created: {
	    type: Date,
	    required: true,
	    unique: false,
	    default: Date.now
	    },
	user_id: {
		 type: id,
		 ref: User
	 }
}
</code></pre>
<h3 id="scribble">Scribble</h3>
<pre><code> {
	id: {
	    type: Integer,
		required: true,
		unique: true
		},
	date_created: {
	    type: Date,
	    required: true,
	    unique: false,
	    default: Date.now
	    },
	time_created: {
	    type: TimestampTZ,
	    required: true,
	    unique: true,
	    default: TimestampTZ.now
	    },
	 scribble_type: {
	    type: Integer,
		required: true,
		unique: false
		},
	scribble_content: {
	    type: Text,
		required: true,
		unique: false
		},
	scribe_id: {
		 type: id,
		 ref: Scribe
	 },
	 user_id: {
		 type: id,
		 ref: User
	 }
}
</code></pre>
<h2 id="api-overview">API Overview</h2>
<pre><code>/api
.
|__/auth
|    |__POST
|	    |__/login
|
|__/users
|	|__GET
|	|__POST
|	|__PATCH
|	|__DELETE
|		|__/
|
|__/scribes
|	|__GET
|	|__GET /scribbles
|	|__GET /currentScribe
|	|__POST
|		|__/
|
|__/scribbles
	|__GET
	|__GET /for_scribe/:scribe_id
	|__GET 
	|__PATCH
	|__DELETE
		|__ /:scribble_id
	|__POST
		|__ /
</code></pre>
<h3 id="post-apiauthlogin">POST <code>/api/auth/login/</code></h3>
<pre><code>//req.body
{
    user_name: String
    password: String
}
// res.body
{
    authToken: {$token}
}
</code></pre>
<h3 id="get--apiusers">GET  <code>/api/users/</code></h3>
<pre><code>//req.body
    {
	    user_name: String
	    password: String
    }
    // res.body
    {
	   id: Integer
	    first_name: String
	    last_name: String
	    email: String
	    user_name: String
    }
</code></pre>
<h3 id="post-apiusers">POST <code>/api/users/</code></h3>
<pre><code>//req.body
{ 
	first_name: String
    last_name: String
    email: String
    password: String
    user_name: String
}
//res.body
{
    id: Integer
    first_name: String
    last_name: String
    email: String
    user_name: String
}
</code></pre>
<h3 id="patch-apiusers">PATCH <code>/api/users/</code></h3>
<pre><code> //req.body
{ 
    first_name: String
    last_name: String
    email: String
    password: String
    user_name: String
}
//res.body
{
    status: 204
}
</code></pre>
<h3 id="delete-apiusers">DELETE <code>/api/users/</code></h3>
<pre><code>     //req.body
{ 
    id: Integer
}
      //res.body
{
	 status: 204
}
</code></pre>
<h3 id="get-apiscribes">GET <code>/api/scribes/</code></h3>
<pre><code>     //req.body
{ 
    id: Integer
    user_id: Integer
}
      //res.body
{
	id: Integer
    date_created: Date
    time_created: TimestampTZ
    scribble_type: Integer
    scribble_content: String
    scribe_id: Integer
}
</code></pre>
<h3 id="get-apiscribesscribbles">GET <code>/api/scribes/scribbles/</code></h3>
<pre><code>     //req.body
{ 
    user_id: Integer
}
      //res.body
{
	id: Integer
    date_created: Date
    time_created: TimestampTZ
    scribble_type: Integer
    scribble_content: String
    scribe_id: Integer
}	
</code></pre>
<h3 id="get-apiscribescurrentscribbles">GET <code>/api/scribes/currentScribbles/</code></h3>
<pre><code>     //req.body
{ 
    user_id: Integer
}
      //res.body
{
	id: Integer
    date_created: Date
    time_created: TimestampTZ
    scribble_type: Integer
    scribble_content: String
    scribe_id: Integer
}
</code></pre>
<h3 id="post-apiscribes">POST <code>/api/scribes/</code></h3>
<pre><code>     //req.body
{ 
    user_id: Integer
}
      //res.body
{
	id: Integer
    date_created: Date
    time_created: TimestampTZ
    scribble_type: Integer
    scribble_content: String
    scribe_id: Integer
}
</code></pre>
<h3 id="get-apiscribbles">GET <code>/api/scribbles/</code></h3>
<pre><code>     //req.body
{ 
    scribe_id: Integer
}
      //res.body
{
	id: Integer
    date_created: Date
    time_created: TimestampTZ
    scribble_type: Integer
    scribble_content: String
    scribe_id: Integer
    user_id: Integer
}
</code></pre>
<h3 id="getapiscribblesfor_scribescribe_id">GET<code>/api/scribbles/for_scribe/:scribe_id</code></h3>
<pre><code>     //req.body
{ 
    scribe_id: Integer
}
      //res.body
{
	id: Integer
    date_created: Date
    time_created: TimestampTZ
    scribble_type: Integer
    scribble_content: String
    scribe_id: Integer
    user_id: Integer
}
</code></pre>
<h3 id="getapiscribblesscribble_id">GET<code>/api/scribbles/:scribble_id</code></h3>
<pre><code>     //req.body
{ 
    scribe_id: Integer
}
      //res.body
{
	id: Integer
    date_created: Date
    time_created: TimestampTZ
    scribble_type: Integer
    scribble_content: String
    scribe_id: Integer
    user_id: Integer
}
</code></pre>
<h3 id="patchapiscribblesscribble_id">PATCH<code>/api/scribbles/:scribble_id</code></h3>
<pre><code>     //req.body
{ 
    scribble_content: String
}
      //res.body
{
	 status: 204
}
</code></pre>
<h3 id="deleteapiscribblesscribble_id">DELETE<code>/api/scribbles/:scribble_id</code></h3>
<pre><code>     //req.body
{ 
    id: Integer
}
      //res.body
{
	 status: 204
}
</code></pre>
<h3 id="postapiscribbles">POST<code>/api/scribbles/</code></h3>
<pre><code>     //req.body
{ 
    scribble_type: Integer
    scribble_content: String
    scribe_id: Integer
    user_id: Integer
}
      //res.body
{
	id: Integer
    date_created: Date
    time_created: TimestampTZ
    scribble_type: Integer
    scribble_content: String
    scribe_id: Integer
    user_id: Integer
}
</code></pre><h2 id="built-withh2">Built With</h2>
<p>
React<br>
Node<br>
Express<br>
JWT<br>
Mocha<br>
Chai<br>
Enzyme<br>

## Authors
Michael Oldacre - Full Stack

## Acknowledgments</h2>
<p>
A great many thanks goes to Mark Lewis for all the help!</p>
<p></p>
<blockquote>
<p>Written with <a href="https://stackedit.io/">StackEdit</a>.</p>
</blockquote>

<!--stackedit_data:
eyJoaXN0b3J5IjpbNDY5NDQ1OTQ2XX0=
-->
