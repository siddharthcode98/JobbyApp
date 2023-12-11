import { Link } from "react-router-dom";

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
    <Link to={`/jobs/${id}`}>
      <li>
        <img src={companyLogoUrl} alt="company logo" />
        <h1>{title}</h1>
        <p>{location}</p>
        <p>{packagePerAnnum}</p>
        <p>{rating}</p>
        <p>{jobDescription}</p>
        <p>{employmentType}</p>
      </li>
    </Link>
  );
};

export default JobItem;
