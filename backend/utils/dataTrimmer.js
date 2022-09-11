const dataTrimmer = (details) => {
  let newDetails = []

  details.forEach(element => {
    let dict = {}
    dict._id = element._id
    dict.username = element.username
    dict.email = element.email
    dict.isAdmin = element.isAdmin
    dict.createdAt = element.createdAt
    dict.updatedAt = element.updatedAt

    newDetails.push(dict)
  });
  return newDetails
}

module.exports = { dataTrimmer }