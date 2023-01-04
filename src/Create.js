import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Feranmi");
  const [isPending, setisPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setisPending(true);
    fetch("http://localhost:8080/blogs", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setisPending(false);
      // history.go(-1); This goes back one step to the last page visted when submitting a form
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title: </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <br />
        <label>Blog author</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="emmaunel">Emmanuel</option>
          <option value="Feranmi">Feranmi</option>
        </select>
        <br />
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
