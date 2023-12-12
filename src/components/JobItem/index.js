import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import "./index.css";
const JobItem = (props) => {
  const { jobDetails } = props;
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails;
  return (
    <Link to={`/jobs/${id}`} style={{ textDecoration: "none" }}>
      <li className="job-item">
        <div className="job-item-section-1">
          <img src={companyLogoUrl} alt="company logo" />
          <div>
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div className="job-item-section-2">
          <div className="location-salary">
            <IoLocationSharp />
            <p>{location}</p>
            <FaSuitcase />
            <p>{employmentType}</p>
          </div>

          <p>{packagePerAnnum}</p>
        </div>
        <div>
          <p>Description</p>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  );
};

export default JobItem;
