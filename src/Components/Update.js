import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Update(props) {
  let user = localStorage.getItem("id");

  const { display, update } = props;

  const [Inputs, setInputs] = useState({ title: "", body: "" });

  useEffect(() => {
    setInputs({ title: update.title, body: update.body });
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    display("none");
    try {
      if (user) {
        await axios.put(
          `https://to-do-backend-pretisha.vercel.app/api/v2/updateTask/${update._id}`,
          { title: Inputs.title, body: Inputs.body, userId: user }
        );
        toast.success("Your task has been Updated!");
      } else {
        toast.error("You cant access this feature without signing in!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ position: "fixed", top: "200px", left: "0px" }}
    >
      <div
        className="d-flex flex-column w-50  mx-3 p-5 toDoForm bg-light"
        style={{
          border: "none",
          outline: "none",
          boxShadow: "0px 0px 10px",
          borderRadius: "4px",
        }}
      >
        <h1 style={{ color: "gold", fontSize: "20px" }}>
          <b>Update Your Task!</b>
        </h1>
        <input
          className="my-1"
          type="text"
          placeholder=" Add new Task Name"
          style={{ border: "none", outline: "none" }}
          name="title"
          value={user ? Inputs.title : ""}
          onChange={change}
        />
        <textarea
          className="my-1"
          type="text"
          placeholder="Elaborate your Task"
          style={{ border: "none", outline: "none" }}
          name="body"
          value={user ? Inputs.body : ""}
          onChange={change}
        />
        <div>
          <button
            type="button"
            className="btn btn-warning my-3 mx-3"
            onClick={() => {
              submit()
            }}
          >
            Update Task
          </button>
          <button
            type="button"
            className="btn btn-dark "
            onClick={() => display("none")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
