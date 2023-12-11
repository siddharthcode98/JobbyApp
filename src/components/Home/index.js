import Header from "../Header";

const Home = (props) => {
  const onClickFindJobs = () => {
    const { history } = props;
    history.replace("/jobs");
  };
  return (
    <>
      <Header />
      <div className="Home-page-container">
        <h1>Find the Job that fits your life</h1>
        <p>Million of people are searching for jobs</p>
        <button type="button" onClick={onClickFindJobs}>
          Find Jobs
        </button>
      </div>
    </>
  );
};
export default Home;
