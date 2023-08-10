import { getReviewsById } from '../../Controllers/Reviews.controllers.js'

const getReviewsByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await getReviewsById(id)
    return res.status(200).json(data)
  } 
  catch (error) {
    next(error)
  }
}

export default getReviewsByIdHandler