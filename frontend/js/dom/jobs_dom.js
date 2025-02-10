// create a function
// that's going to two arguments
// one is going to be the jobsData
// second is going to be an element
//to render the all job items
const renderJobListItem = (jobData, htmlElement) => {

  console.log(jobData)

  jobData.forEach(job => {

      let { title, company, location, date_posted, id } = job // Destructuring 

      let date =  date_posted
      let newDate = date.replace(/-/g, "/")
     

      const jobListItemHTML = `<li class="job-card card my-1" style="width: 18rem;">
                                <div class="card-header">${company}</div>
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">${location}</h6>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${newDate}</h6>
                                    <button class="btn btn-primary view-job-button" job-data-id="${id}">View Job</button>
                                </div>
                            </li> `

                           
      htmlElement.innerHTML += jobListItemHTML
  })
}

const renderSingleJobItem = (job, jobDetailsCard) => {
    if (!job) {
        jobDetailsCard.innerHTML = "<p>No job details available.</p>"
        return
    }

    let { title, company, location, date_posted, description, qualifications } = job

    let date =  date_posted
    let newDate = date.replace(/-/g, "/")

    const jobSingleItemHTML = `<div class="card">
                                <div class="card-body">
                                    <h3 class="card-title">${title}</h3>
                                    <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${company}</h4>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">${location}</h6>
                                    <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${newDate}</h6>

                                    <h5 class="card-subtitle mb-2">Description</h5>
                                    <p class="card-text">${description || "No description provided."}</p>
                                    
                                    <h5 class="card-subtitle mb-2">Qualifications</h5>
                                    <p class="card-text">${qualifications || "No qualifications provided."}</p>
                                    <button class="btn btn-success save-job" job-data-id="${job.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5 0 0 1 2 15.5zm2-1a1 0 0 0-1 1v12.566l4.723-2.482a.5 0 0 1 .554 0L13 14.566V2a1 0 0 0-1-1z" />
                                        </svg>
                                        Save Job
                                    </button>
                                </div>
                            </div>`

   
    jobDetailsCard.innerHTML = jobSingleItemHTML
};





const renderSavedJobs = (jobData, htmlElement) => {
    if (!jobData || jobData.length === 0) {
        htmlElement.innerHTML = "<p>No saved jobs available.</p>"
        return;
    }

    jobData.forEach((job) => {
        let { title, company, location, date_posted, id } = job

        let date =  date_posted
        let newDate = date.replace(/-/g, "/")

        let savedJobsItemHTML = `
            <li class="job-card card my-1" style="width: 18rem;">
                <div class="card-header">${company}</div>
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${location}</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${newDate}</h6>         
                    <button class="btn btn-primary view-job-button" job-data-id="${id}">View Job</button>
                </div>
            </li>`

        htmlElement.innerHTML += savedJobsItemHTML
    })
}



export { renderJobListItem, renderSingleJobItem, renderSavedJobs }