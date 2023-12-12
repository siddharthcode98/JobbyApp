import { Component } from "react";

import Cookies from "js-cookie";

import Loader from "react-loader-spinner";

import Header from "../Header";
import { IoLocationSharp } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    SingleJobItemDetails: {},
    similarJobs: [],
  };

  componentDidMount() {
    this.getJobItemDetails();
  }
  convertToCamelCase = (job_details) => ({
    companyLogoUrl: job_details.company_logo_url,
    companyWebsiteUrl: job_details.company_website_url,
    employmentType: job_details.employment_type,
    id: job_details.id,
    jobDescription: job_details.job_description,
    skills: job_details.skills,
    lifeAtCompany: job_details.life_at_company,
    location: job_details.location,
    packagePerAnnum: job_details.package_per_annum,
    rating: job_details.rating,
    title: job_details.title,
  });
  convertToCamelCase2 = (job_details) => ({
    companyLogoUrl: job_details.company_logo_url,
    employmentType: job_details.employment_type,
    id: job_details.id,
    jobDescription: job_details.job_description,
    location: job_details.location,
    rating: job_details.rating,
    title: job_details.title,
  });
  getJobItemDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const JobDetailsApi = `https://apis.ccbp.in/jobs/${id}`;
    const response = await fetch(JobDetailsApi, options);
    if (response.ok) {
      const data = await response.json();
      const { job_details, similar_jobs } = data;
      console.log(job_details);
      const updatedjobDetails = this.convertToCamelCase(job_details);
      const updatedSimilarJobs = similar_jobs.map((job) => {
        return this.convertToCamelCase2(job);
      });
      this.setState({
        SingleJobItemDetails: updatedjobDetails,
        apiStatus: apiStatusConstants.success,
        similarJobs: updatedSimilarJobs,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };
  LoadingView = () => {
    return (
      <div className="loader-container-2" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    );
  };
  successView = () => {
    const { SingleJobItemDetails, similarJobs } = this.state;
    console.log(similarJobs);
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = SingleJobItemDetails;

    return (
      <section className="single-job-container">
        <div className="single-job-details">
          <div className="single-job-1">
            <img src={companyLogoUrl} alt=" job details company logo" />
            <div className="title-rating">
              <p>{title}</p>
              <p>{rating}</p>
            </div>
          </div>
          <div className="single-job-2 ">
            <div className="location-employment">
              <IoLocationSharp />
              <p>{location}</p>
              <FaSuitcase />
              <p>{employmentType}</p>
            </div>

            <p className="package">{packagePerAnnum}</p>
          </div>
          <div>
            <div className="single-job-description">
              <p>Description</p>
              <a href={companyWebsiteUrl}>Visit</a>
            </div>
            <div>
              <p>{jobDescription}</p>
            </div>
          </div>
          <div>
            <p>Skills</p>
            <ul className="skill-container">
              {skills.map((skill) => (
                <li key={skill.name}>
                  <img
                    src={skill.image_url}
                    alt={skill.name}
                    className="skill-image"
                  />

                  <p>{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="single-job-3">
            <div>
              <p>Life at Company</p>
              <p>{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.image_url}
              alt=" life at company"
              className="company-image"
            />
          </div>
        </div>
        <div>
          <p>Similar Jobs</p>
          <ul className="similar-job-container">
            {similarJobs.map((eachJob) => (
              <li key={eachJob.id} className="similar-job-item">
                <div className="single-job-1">
                  <img
                    src={eachJob.companyLogoUrl}
                    alt="similar job company logo"
                  />
                  <div className="title-rating">
                    <p>{eachJob.title}</p>
                    <p>{eachJob.rating}</p>
                  </div>
                </div>
                <div>
                  <p>Description</p>
                  <p>{eachJob.jobDescription}</p>
                </div>
                <div className="location-employment">
                  <IoLocationSharp />
                  <p>{eachJob.location}</p>
                  <FaSuitcase />
                  <p>{eachJob.employmentType}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
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
        <button className="retryBtn" onClick={() => this.getJobItemDetails}>
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
    return (
      <>
        <Header />
        <>{this.ShowViews()}</>
      </>
    );
  }
}

export default JobItemDetails;
//  companyLogoUrl: job_details.company_logo_url,
//     companyWebsiteUrl: job_details.company_website_url,
//     employmentType: job_details.employment_type,
//     id: job_details.id,
//     jobDescription: job_details.job_description,
//     skills: job_details.skills,
//     lifeAtCompany: job_details.life_at_company,
//     location: job_details.location,
//     packagePerAnnum: job_details.packagePerAnnum,
//     rating
