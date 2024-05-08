import AddPost from "../features/news/AddPost";
import Main from "../ui/Main";

function News() {
  return (
    <div className="my-8 ">
      <Main>
        <div className="space-y-4">
          <AddPost />
        </div>
      </Main>
    </div>
  );
}

export default News;
