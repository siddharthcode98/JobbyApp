import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const Home = () => {
  return (
    <>
      <Header />
      <section className="Home-page-container">
        <div className="home-page-text">
          <h1>
            Find the Job that fits <br />
            your life
          </h1>
          <p>
            Million of people are searching for jobs.Sunt eu cupidatat do
            nostrud id. Ipsum consectetur qui mollit elit enim irure aliqua.
            Laboris adipisicing ex eu fugiat quis amet do commodo adipisicing
            consequat voluptate laborum adipisicing.
          </p>
          <Link to="/jobs">
            <button type="button" className="findJobsBtn">
              Find Jobs
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};
export default Home;
