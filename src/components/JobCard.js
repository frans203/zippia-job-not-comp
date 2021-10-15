import React from "react";
// Importing classes from JobCard CSS file, that is a module.
import classes from "./JobCard.module.css";
function JobCard({ title, company, description }) {
  // Every JobCard will have a Job Title, a company name, and a description. All of these 3 are stylized from the module file and will be render below.
  return (
    <div className={classes.jobCard}>
      <div className={classes.jobCard__firstContainer}>
        <h1 className={classes.jobCard__title}>{title}</h1>
      </div>
      <div className={classes.jobCard__secondContainer}>
        <h2 className={classes.jobCard__company}>{company}</h2>
        <div className={classes.jobCard__description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
