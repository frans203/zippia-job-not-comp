import classes from "./App.module.css";
import { useEffect, useState } from "react";
import JobCard from "./components/JobCard"; //importgin the JobCard component
import SearchIcon from "@material-ui/icons/Search"; //importing the SearchIcon from material-ui third-party library
function App() {
  // Here I set and create the first states with useState
  const [jobs, setJobs] = useState([]); //state for the jobs array
  const [enteredFilter, setEnteredFilter] = useState(""); //state for whatever the user enters in the input
  const [loading, setIsLoading] = useState(false); //state that indicates when a request is beeing made

  const makeRequest = async () => {
    // this function makes a request to ZIPPIA API and with the object returned it will fill the jobs state with the setJobs function
    setIsLoading(true);
    setEnteredFilter("");
    const request = await fetch("https://www.zippia.com/api/jobs/", {
      method: "POST",
      body: JSON.stringify({
        companySkills: true,
        dismissedListingHashes: [],
        fetchJobDesc: true,
        jobTitle: "Business Analyst",
        locations: [],
        numJobs: 10, //Rendering only 10 results, as wanted
        previousListingHashes: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await request.json();
    setIsLoading(false);
    await setJobs(json);
  };
  useEffect(() => {
    // with the useEffect I made the app only triggers the makeRequest function at the very first moment the app loads
    makeRequest();
  }, []);

  const submitHandler = (e) => {
    // Once the user click the search button, this function will filter for any jobs that has a company name with the words the user writed at the input. And so, only these filtered jobs will be displayed
    e.preventDefault();
    setIsLoading(true);
    const filteredJobs = jobs.jobs.filter((job) => {
      return job.companyName
        .toLowerCase()
        .includes(enteredFilter.toLowerCase());
    });

    setJobs({ jobs: filteredJobs });
    setIsLoading(false);
    if (enteredFilter === "") {
      makeRequest();
    }
  };
  const filterHandler = () => {
    // When the user clicks the latests jobs button, this function will be triggered and it will show only the jobs that were posted 7 days ago until now.
    const latestJobs = jobs.jobs.filter((job) => {
      return job.postedDate.includes(
        "1" || "2" || "3" || "4" || "5" || "6" || "7"
      );
      // Because the postedDate propery was writed like: "7d ago" i needed to use that aproach above
    });

    setJobs({ jobs: latestJobs });
  };
  return (
    <div>
      <img
        className={classes.logo}
        src="https://www.zippia.com/ui-router/images/header/logo_white.svg"
      />
      <h1 className={classes.jobs__h1}>JOBS</h1>
      <div className={classes.jobs__list}>
        <div className={classes.jobs__search}>
          <form onSubmit={submitHandler}>
            {/* Input were the user can write the company name and search for it */}
            <input
              type="text"
              value={enteredFilter}
              className={classes.jobs__input}
              placeholder="Search by company name"
              onChange={(e) => {
                console.log(e.target.value);
                setEnteredFilter(e.target.value);
              }}
            />
            <button type="submit" className={classes.jobs__icon}>
              <SearchIcon />
            </button>
          </form>
        </div>
        {loading ? <h4>Loading...</h4> : ""}
        {/* When the user makes a request the loading state will be true and that header above will be displayed. Once the request is done the state is set to false again.  */}
        <div className={classes.action__buttons}>
          <button className={classes.jobs__icon} onClick={filterHandler}>
            Latest Jobs
          </button>
          <button className={classes.jobs__icon} onClick={makeRequest}>
            All Jobs
          </button>
        </div>

        {jobs?.jobs?.map((job) => {
          // for every job it will generate a JobCard component
          return (
            <JobCard
              title={job.jobTitle}
              company={job.companyName}
              description={job.shortDesc}
              key={Math.random()}
              id={Math.random()}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
