import { postReviews } from '../../Controllers/Reviews.controllers.js'

const postReviewsHandler = async (req, res, next) => {
  try {
    const data = await postReviews(req.body)

    if(data.msg === "Error creating the review"){

      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  } 
  catch (error) {
    next(error)
  }
}

export default postReviewsHandler