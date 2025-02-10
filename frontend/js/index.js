// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// Import our API
import { getJobList, getJobDetails, getSavedJobDetails, postJobDetails} from './api/jobs'
import { renderJobListItem, renderSingleJobItem, renderSavedJobs } from './dom/jobs_dom'

let allJobData = []

document.addEventListener("DOMContentLoaded", async () => {
    try {
        allJobData = await getJobList()

        let jobsListElement = document.querySelector("#searched-jobs");
        renderJobListItem(allJobData, jobsListElement)
        
        attachViewJobBtnListeners()
        setupTabSwitching()

    } catch (error) {
        console.error("Error fetching jobs:")
    }
});

const searchJobForm = document.getElementById('search-jobs-form')

searchJobForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    let searchInput = document.getElementById('query-input')

    let query = searchInput.value.toLowerCase()
    let jobsListElement = document.querySelector("#searched-jobs")

    jobsListElement.innerHTML = "" 

    const filteredJobs = allJobData.filter(job => {
        let titleMatch = job.title.toLowerCase().includes(query)
        let companyMatch = job.company.toLowerCase().includes(query)
        let descriptionMatch = job.description.toLowerCase().includes(query)

        return titleMatch || companyMatch || descriptionMatch
    })

    if (filteredJobs.length > 0) {
        renderJobListItem(filteredJobs, jobsListElement)
    } else {
        jobsListElement.innerHTML = `<p class="text-dark">No Result found</p>`
    }

    attachViewJobBtnListeners()
})


const attachViewJobBtnListeners = () => {
    const viewJobButtons = document.querySelectorAll(".view-job-button")

    viewJobButtons.forEach(button => {
        button.addEventListener("click", async () => {

            let jobId = button.getAttribute("job-data-id")
            let jobDetails = await getJobDetails(jobId)
            let jobDetailsCard = document.querySelector("#job-details-card")

            renderSingleJobItem(jobDetails, jobDetailsCard)
            attachSaveJobBtnListener() 
        })
    })
}



const attachSaveJobBtnListener = () => {
    const saveJobButton = document.querySelector(".save-job")

    if (saveJobButton) {
        saveJobButton.addEventListener("click", async () => {
            const jobId = saveJobButton.getAttribute("job-data-id")


            try {
                let savedJob = await postJobDetails(jobId)
                console.log("Job saved successfully", savedJob)

            } catch (error) {
                console.error("Error saving a job")
               
            }
        })
    }
}


// Display Saved Jobs
const getSavedJobs = async () => {
    let savedJobsListElement = document.querySelector("#my-jobs")
    savedJobsListElement.innerHTML = ""

    try {
        const savedJobs = await getSavedJobDetails(); // [id, jobId, createdAt ]

        const detailedJobs = await Promise.all(
            savedJobs.map(async (savedJob) => {
                const jobDetails = await getJobDetails(savedJob.jobId)
                return { ...jobDetails, savedAt: savedJob.createdAt }
            })
        )

        //console.log("Display saved jobs")
        renderSavedJobs(detailedJobs, savedJobsListElement)

    } catch (error) {
        //console.error("Error displaying saved jobs")
        savedJobsListElement.innerHTML = `<p class="text-danger">Failed to load saved jobs.</p>`
    }
};

//Tabs
const setupTabSwitching = () => {
    let tabs = document.querySelectorAll("#jobs-tab-navigation .nav-link")
    let searchTab = document.querySelector("#search-jobs-tab")
    let myJobsTab = document.querySelector("#my-jobs-tab")

    tabs.forEach(tab => {
        tab.addEventListener("click", (event) => {
            event.preventDefault()

            tabs.forEach(tab => tab.classList.remove("active"))

            searchTab.classList.add("d-none")
            myJobsTab.classList.add("d-none")

            tab.classList.add("active")
            if (tab.textContent.trim() === "Search") {
                searchTab.classList.remove("d-none")
            } else if (tab.textContent.trim() === "My Bookmarked Jobs") {
                myJobsTab.classList.remove("d-none")
                getSavedJobs() 
            }
        })
    })
}
