import { Component } from "react";

import EmploymentTypes from "../EmploymentTypes";

import SalaryRange from "../SalaryRange";

import UserProfileView from "../UserProfileView";

import JobItem from "../JobItem";

import { BsSearch } from "react-icons/bs";

import Loader from "react-loader-spinner";

import Cookies from "js-cookie";

import Location from "../Location";

import "./index.css";

const employmentTypesList = [
  { label: "fullTime", employmentTypeId: "FULLTIME" },
  { label: "partTime", employmentTypeId: "PARTTIME" },
  { label: "freelance", employmentTypeId: "FREELANCE" },
  { label: "internship", employmentTypeId: "INTERNSHIP" },
];

const salaryRangesList = [
  { salaryRangeId: "1000000", label: "10LPA and Above" },
  { salaryRangeId: "2000000", label: "20LPA and Above" },
  { salaryRangeId: "3000000", label: "30LPA and Above" },
  { salaryRangeId: "4000000", label: "40LPA and Above" },
];

const AvailableLocationList = [
  { locationId: "1", label: "Hyderabad" },
  { locationId: "2", label: "Bangalore" },
  { locationId: "3", label: "Chennai" },
  { locationId: "4", label: "Delhi" },
  { locationId: "5", label: "Mumbai" },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

class JobSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    salaryRange: "",
    search: "",
    locationList: [],
  };
  updatedEmploymentTypes = (category) => {
    const { employmentType } = this.state;
    const isThere = employmentType.includes(category);
    if (isThere) {
      const updatedTypesList = employmentType.filter(
        (eachItem) => eachItem !== category
      );
      this.setState({ employmentType: updatedTypesList }, this.getJobs);
    } else {
      this.setState(
        (prevState) => ({
          employmentType: [...prevState.employmentType, category],
        }),
        this.getJobs
      );
    }
  };
  updatedSalaryRange = (salary) => {
    // console.log(salary);
    this.setState({ salaryRange: salary }, this.getJobs);
  };
  onChangeUserInput = (event) => {
    this.setState({ search: event.target.value });
  };
  updateLocation = (location) => {
    const { locationList } = this.state;
    const isThere = locationList.includes(location);
    if (isThere) {
      const updatedLocationList = locationList.filter(
        (item) => item !== location
      );
      this.setState({ locationList: updatedLocationList });
    } else {
      this.setState((prevState) => ({
        locationList: [...prevState.locationList, location],
      }));
    }
  };
  userInputEnter = (event) => {
    const { search } = this.state;
    console.log(search);
    this.setState({ search }, this.getJobs);
  };
  getJobs = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const { employmentType, salaryRange, search } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ","
    )}&minimum_package=${salaryRange}&search=${search}`;
    const response = await fetch(jobsUrl, options);

    // console.log(data);
    if (response.ok) {
      const data = await response.json();
      const filteredData = data.jobs.map((eachJob) => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }));
      this.setState({
        jobsList: filteredData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };
  componentDidMount() {
    this.getJobs();
  }
  LoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  );
  successView = () => {
    let { jobsList, locationList } = this.state;

    console.log(locationList);

    const emptyList = jobsList.length === 0;

    let filteredList = [];

    if (locationList.length > 0) {
      filteredList = jobsList.filter((item) =>
        locationList.includes(item.location)
      );
    } else {
      filteredList = jobsList;
    }

    return (
      <>
        {emptyList ? (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
          </div>
        ) : (
          <div className="jobs-list-container">
            <ul className="jobs-list">
              {filteredList.map((eachJob) => (
                <JobItem jobDetails={eachJob} key={eachJob.id} />
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };
  failureView = () => (
    <div className="failure-image-container">
      <div className="failure-image">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Opps! Something went Wrong</h1>
        <button className="retryBtn" onClick={() => this.getJobs}>
          Retry
        </button>
      </div>
    </div>
  );
  ShowViews = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.LoadingView();
      case apiStatusConstants.failure:
        return this.failureView();
      case apiStatusConstants.success:
        return this.successView();
      default:
        return null;
    }
  };

  render() {
    const { search } = this.state;
    return (
      <section>
        <div className="jobs-section-container">
          <div className="section-1">
            <div id="mobile-search-bar">
              <div className="search-bar-container">
                <input
                  type="search"
                  placeholder="search"
                  onChange={this.onChangeUserInput}
                  value={search}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  onClick={this.userInputEnter}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <UserProfileView />
            <div className="filterContainer ">
              <h1>Types of Employment</h1>
              <ul>
                {employmentTypesList.map((eachEmployment) => (
                  <EmploymentTypes
                    employment={eachEmployment}
                    key={eachEmployment.employmentTypeId}
                    updatedEmploymentTypes={this.updatedEmploymentTypes}
                  />
                ))}
              </ul>
            </div>

            <div className="filterContainer ">
              <h1>Types of Employment</h1>
              <ul>
                {salaryRangesList.map((eachSalary) => (
                  <SalaryRange
                    salaryItem={eachSalary}
                    key={eachSalary.salaryRangeId}
                    updatedSalaryRange={this.updatedSalaryRange}
                  />
                ))}
              </ul>
            </div>

            <div className="filterContainer ">
              <h1>Locations</h1>
              <ul>
                {AvailableLocationList.map((eachLocation) => (
                  <Location
                    details={eachLocation}
                    key={eachLocation.locationId}
                    updateLocation={this.updateLocation}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="section-2">
            <div id="large-search-bar">
              <div className="search-bar-container">
                <input
                  type="search"
                  placeholder="search"
                  onChange={this.onChangeUserInput}
                  value={search}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  onClick={this.userInputEnter}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <>{this.ShowViews()}</>
          </div>
        </div>
      </section>
    );
  }
}

export default JobSection;
