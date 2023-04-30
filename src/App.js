import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "../node_modules/react-router-dom/modules";

export default function App() {
  const posts = [
    {
      id: 1,
      title: "My first post",
      date: "4-7-2020",
      content: "This is my first post!",
    },
    {
      id: 2,
      title: "Checking in",
      date: "4-7-2020",
      content: "Yesterday was a good day",
    },
    {
      id: 1,
      title: "Vacation time!",
      date: "4-7-2020",
      content: "Finally time to head out!",
    },
  ];

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/friends">Friends</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/posts">
            <Posts posts={posts} />
          </Route>
          <Route path="/friends">
            <Friends names={["Tom", "Sally", "Samantha"]} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Friends(props) {
  const { names } = props;
  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {names.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
}

function Posts(props) {
  //more routing needs to happen inside of the component
  const { posts } = props;
  const match = useRouteMatch();
  const findPostById = (id) => posts.filter((post) => post.id == id)[0];
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={index}>
              <Link to={`${match.url}/${postId}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
      <Switch>
        <Route
          path={`${match.path}/:postId`}
          render={(props) => (
            <Post {...props} data={findPostById(props.match.params.postId)} />
          )}
        />

        <Route path={match.path}>
          <h3>Please Select a Post.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Post(props) {
  const { data } = props;
  return (
    <div>
      <h3>{data.title}</h3>
      <h4>{data.date}</h4>
      <p>{data.content}</p>
    </div>
  );
}
