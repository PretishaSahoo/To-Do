import React, { useState, useEffect } from "react";
import Todocards from "./Todocards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

export default function Todo() {
  const [Array, setArray] = useState([]);
  const [formData, setformData] = useState({ title: "", body: "" });
  const [id, setId] = useState(localStorage.getItem("id"));
  const [toUpdateArray, setToUpdateArray] = useState({ title: "", body: "", _id: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const submit = async () => {
    if (formData.title === "" || formData.body === "") {
      toast.error("Title and body can't be empty!");
    } else {
      if (id) {
        await axios.post("https://to-do-backend-pretisha.vercel.app/api/v2/addTask", {
          title: formData.title,
          body: formData.body,
          id: id,
        });
        setformData({ title: "", body: "" });
        toast.success("Your task added!");
        fetchTasks(id);
      } else {
        setArray([...Array, formData]);
        setformData({ title: "", body: "" });
        toast.success("Your task added!");
        toast.error("Your task added but not saved. Please Signup!");
      }
    }
  };

  const del = async (cardid) => {
    if (id) {
      try {
        await axios.delete(
          `https://to-do-backend-pretisha.vercel.app/api/v2/deleteTask/${cardid}`,
          { data: { userId: id } }
        );
        toast.success("Your task has been deleted!");
        fetchTasks(id); // Fetch tasks after deleting one
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete task. Please try again.");
      }
    } else {
      toast.error("Please Signup first!");
    }
  };

  const dis = (value) => {
    document.getElementById("todoUpdate").style.display = value;
  };

  const update = (value) => {
    setToUpdateArray(Array[value]);
    dis("block");
  };

  const fetchTasks = async (userId) => {
    if (userId) {
      try {
        const response = await axios.get(`https://to-do-backend-pretisha.vercel.app/api/v2/getTasks/${userId}`);
        setArray(response.data.list);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchTasks(id);
    }
  }, [id,update]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newId = localStorage.getItem("id");
      setId(newId);
      if (newId) {
        fetchTasks(newId);
      } else {
        setArray([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className="todo">
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{
            width: "100% ",
            minHeight: "70vh",
            maxHeight: "auto",
            position: "relative",
          }}
        >
          <ToastContainer />
          <div
            className="d-flex flex-column w-70 p-5 toDoForm"
            style={{
              border: "none",
              outline: "none",
              boxShadow: "0px 0px 10px",
              borderRadius: "4px",
              width: "85vw"
            }}
          >
            <h1 style={{ color: "red", fontSize: "20px" }}>
              <b>Add Your Task!</b>
            </h1>
            <input
              className="my-1"
              type="text"
              placeholder="Task Name"
              style={{ border: "none", outline: "none" }}
              onChange={change}
              name="title"
              value={formData.title}
            />
            <textarea
              className="my-1"
              type="text"
              placeholder="Elaborate your Task"
              style={{ border: "none", outline: "none" }}
              onChange={change}
              name="body"
              value={formData.body}
            />
            <button
              type="button"
              className="btn btn-danger my-3"
              onClick={submit}
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="todo-body">
          <div className="container-fluid" style={{ paddingBottom: "200px" }}>
            <div className="row w-80">
              {Array.length >= 0 &&
                Array?.map((item, index) => (
                  <div className="col-lg-2 mx-3 mx-lg-5 my-2" key={index}>
                    <Todocards
                      id={item?._id}
                      title={item?.title}
                      body={item?.body}
                      display={dis}
                      del={del}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div id="todoUpdate" style={{ display: "none" }}>
        <Update display={dis} update={toUpdateArray} />
      </div>
    </>
  );
}
