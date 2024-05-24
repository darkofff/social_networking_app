import AddPost from "../features/posts/AddPost";
import DisplayPosts from "../features/news/DisplayPosts";
import PostsActions from "../features/news/PostsActions";
import TodosNews from "../features/news/TodosNews";
import Main from "../ui/Main";

function News() {
  return (
    <div className="my-8 px-1">
      <Main>
        <AddPost />
        <PostsActions />
        <DisplayPosts />
      </Main>
      <TodosNews />
    </div>
  );
}

export default News;
