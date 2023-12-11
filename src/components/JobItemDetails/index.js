import { Component } from "react";

import Cookies from "js-cookie";

import Loader from "react-loader-spinner";

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
    packagePerAnnum: job_details.packagePerAnnum,
    rating: job_details.rating,
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
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>;
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
    } = SingleJobItemDetails;

    return (
      <>
        <div>
          <img src={companyLogoUrl} alt=" job details company logo" />
          <a href={companyWebsiteUrl}>Visit</a>
          <p>{jobDescription}</p>
          <p>{employmentType}</p>
          <ul>
            {skills.map((skill) => (
              <li key={skill.name}>
                <img src={skill.image_url} alt={skill.name} />

                <p>{skill.name}</p>
              </li>
            ))}
          </ul>
          <div>
            <img src={lifeAtCompany.image_url} alt=" life at company" />
            <h1>Life at Company</h1>
            <p>{lifeAtCompany.description}</p>
          </div>
          <p>{location}</p>
          <p>{packagePerAnnum}</p>
          <p>{rating}</p>
        </div>
        <div>
          <ul>
            {similarJobs.map((eachJob) => (
              <li key={eachJob.id}>
                <img
                  src={eachJob.companyLogoUrl}
                  alt="similar job company logo"
                />
                <p>{eachJob.rating}</p>
                <p>{eachJob.location}</p>
                <p>{eachJob.jobDescription}</p>
                <p>{eachJob.title}</p>
                <p>{eachJob.employmentType}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };
  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={() => this.getJobItemDetails()}>
        Retry
      </button>
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
    return <div>{this.ShowViews()}</div>;
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
