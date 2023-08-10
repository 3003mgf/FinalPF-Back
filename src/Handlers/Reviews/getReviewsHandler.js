import { getReviews } from "../../Controllers/Reviews.controllers.js"

const getReviewsHandler = async (req, res, next) => {
  try {
    const data = await getReviews()
    return res.status(200).json(data)
  } 
  catch (error) {
    next(error)
  }
}

export default getReviewsHandler