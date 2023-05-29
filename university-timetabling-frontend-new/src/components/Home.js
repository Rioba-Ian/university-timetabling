import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import Layout from "../Layout/DashboardLayout";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [semester, setSemester] = useState(1);
  const [timetables, setTimetables] = useState([]);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to generate timetable
  const generateTimetable = () => {
    axios
      .post("http://localhost:8080/api/schedule/generate", {
        semester: semester,
      })
      .then((response) => {
        alert("Timetables generated");
        fetchTimetables();
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  // Function to fetch all timetables
  const fetchTimetables = () => {
    axios
      .get("http://localhost:8080/api/schedule/timetables")
      .then((response) => {
        setTimetables(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  // Fetch all timetables on initial render
  useEffect(() => {
    fetchTimetables();
  }, []);

  // handle logout
  async function logout() {
    setAuth({});
    navigate("/login");
  }

  return (
    <Layout>
      <main>
        <h1>University Timetabling System</h1>

        <button onClick={logout} className="btn btn-warning">
          Logout
        </button>

        <form>
          <div>
            <label>Semester</label>
            <select className="select select-accent w-full max-w-xs">
              <option disabled selected>
                Select the semester
              </option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <button className="btn btn-accent" onClick={generateTimetable}>
            Generate Timetable
          </button>
        </form>

        <h2>Timetables</h2>
        {timetables.map((timetable, index) => (
          <div key={index}>
            <h3>Semester {timetable.semester}</h3>
            <pre>{JSON.stringify(timetable.data, null, 2)}</pre>
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default Home;
