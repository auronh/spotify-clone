import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@uidotdev/usehooks";

function Signup() {
  const [users, setUsers] = useLocalStorage("users");

  const handleSignup = (e) => {
    e.preventDefault();

    const form = e.target.elements;

    let user = {
      id: uuidv4(),
      email: form["email"].value,
      password: form["password"].value,
      name: form["name"].value,
      birth: [form["day"].value, form["month"].value, form["year"].value],
      liked:[]
    };

    if (users !== undefined) {
      if (users.filter((u) => u.email === user.email)) {
        alert("This email already exists!");
      } else {
        setUsers([...users, user]);
      }
    } else {
      setUsers([user]);
    }

    window.location.href = "/login";
  };

  return (
    <div className="d-flex flex-column align-items-center my-5">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4jbXkWaYRcqw7zkFheo1YSlmlUSaEZyQFw&s"
        alt=""
        style={{ height: "40px" }}
      />
      <h1 className="text-white text-center fw-bold fs-1 mt-3">
        Sign up to start <br />
        listening
      </h1>
      <form
        action="POST"
        className="d-flex flex-column w-25 p-4"
        onSubmit={handleSignup}
      >
        <label htmlFor="email" className="text-white mb-1">
          Email Address
        </label>
        <input
          className="p-1 px-2 bg-transparent border text-white mb-3"
          type="email"
          name="email"
          placeholder="name@domain.com"
          required
        />
        <label htmlFor="password" className="text-white mb-1">
          Password
        </label>
        <input
          className="p-1 px-2 bg-transparent border text-white mb-3"
          type="password"
          name="password"
          required
        />
        <label htmlFor="name" className="text-white mb-1">
          Name
        </label>
        <input
          className="p-1 px-2 bg-transparent border text-white mb-3"
          type="text"
          name="name"
          required
        />
        <label htmlFor="birth" className="text-white mb-1">
          Date of Birth
        </label>
        <div className="d-flex gap-2 mb-4">
          <input
            className="p-1 px-2 bg-transparent border text-white mb-3 w-100"
            type="number"
            name="day"
            placeholder="dd"
            max={31}
            required
          />
          <select
            className="p-1 px-2 bg-transparent border text-white mb-3 w-100"
            aria-label="Default select example"
            name="month"
            defaultValue="Month"
          >
            <option className="bg-black" value="Month">
              Month
            </option>
            <option className="bg-black" value="January">
              January
            </option>
            <option className="bg-black" value="February">
              February
            </option>
            <option className="bg-black" value="March">
              March
            </option>
            <option className="bg-black" value="April">
              April
            </option>
            <option className="bg-black" value="May">
              May
            </option>
            <option className="bg-black" value="June">
              June
            </option>
            <option className="bg-black" value="July">
              July
            </option>
            <option className="bg-black" value="August">
              August
            </option>
            <option className="bg-black" value="September">
              September
            </option>
            <option className="bg-black" value="October">
              October
            </option>
            <option className="bg-black" value="November">
              November
            </option>
            <option className="bg-black" value="December">
              December
            </option>
          </select>
          <input
            className="p-1 px-2 bg-transparent border text-white mb-3 w-100"
            type="number"
            name="year"
            placeholder="yy"
            min={1950}
            required
          />
        </div>
        <button
          type="submit"
          className="fw-semibold border-0 rounded-pill"
          style={{ height: "40px", backgroundColor: "#1DB954" }}
        >
          Sign Up
        </button>
      </form>
      <hr className="w-25 text-white mb-4" />
      <p className="text-white">
        Already have an account? <Link to="/login">Log in here.</Link>
      </p>
    </div>
  );
}

export default Signup;
