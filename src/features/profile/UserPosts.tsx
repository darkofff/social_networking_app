import Main from "../../ui/Main";
import Post from "../../ui/Post";

const posts = [
  " 1Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odio vero architecto alias repellendus ut, nam molestias suscipit tempora at. Optio consectetur esse neque dolorum et rerum ex ipsa facilis.",
  " 2Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odio vero architecto alias repellendus ut, nam molestias suscipit tempora at. Optio consectetur esse neque dolorum et rerum ex ipsa facilis.",
  " 3Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odio vero architecto alias repellendus ut, nam molestias suscipit tempora at. Optio consectetur esse neque dolorum et rerum ex ipsa facilis.",
  " 4Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odio vero architecto alias repellendus ut, nam molestias suscipit tempora at. Optio consectetur esse neque dolorum et rerum ex ipsa facilis.",
  " 5Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odio vero architecto alias repellendus ut, nam molestias suscipit tempora at. Optio consectetur esse neque dolorum et rerum ex ipsa facilis.",
];

function UserPosts() {
  return (
    <Main>
      <div className="mt-4  ">
        {posts.map((post) => (
          <Post post={post} key={post} />
        ))}
      </div>
    </Main>
  );
}

export default UserPosts;
