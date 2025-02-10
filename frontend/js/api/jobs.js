const BASE_URL = "http://localhost:3000"

// api functions here.
const getJobList = async () => {
  const URL = `${BASE_URL}/jobs`
 
  const response = await fetch(URL, {
    method: "GET" 
  })
 
  const data = await response.json()
  return data  // get all the jobs
}

const getJobDetails = async (jobId) => {

  const URL = `${BASE_URL}/jobs/${jobId}`

  console.log(URL)
    const response = await fetch(URL, {
      method: "GET"
    })

    const data = await response.json()
   
    return data // Return the specific job details


}

const getSavedJobDetails  = async () => {
  
  const URL = `${BASE_URL}/saved-jobs`

    const response = await fetch(URL, {
      method: "GET"
    })

    const data = await response.json()
   
    return data // Return the saved job details


}


const postJobDetails  = async (jobId) => {
   const URL = `${BASE_URL}/saved-jobs`

  const response = await fetch(URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobId: Number(jobId) }),
  })

  return response.ok
}

export { getJobList, getJobDetails, getSavedJobDetails, postJobDetails }