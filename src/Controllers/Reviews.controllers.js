import Reviews from '../Models/Reviews.js'
import Albums from '../Models/Albums.js'
import Users from '../Models/Users.js';

export const getReviews = async () => {
  const data = await Reviews.findAll({
    where: {
      deleted: false,
    },
    include: [
      {
        model: Users,
        // as: "user",
        attributes: ["firstName", "lastName", "avatar"],
      },
    ],
  });
  return data;
};

export const postReviews = async (data) => {
 
  const createReview = await Reviews.create({
    rating: data.rating,
    comment: data.comment,
    UserId: data.UserId
  })

  if(!createReview) return "Error creating the review"

  return {msg:"Review created", data: {...createReview.dataValues, User: data.User}}
}

export const putReviews = async (id, comment, rating) => {
  const review = await Reviews.findOne({where: { id }})
  review.comment = comment
  review.rating = rating
  await review.save()
  
  return review
}

export const deleteReviews = async (id) => {
  const review = await Reviews.findOne({where: { id }})
  review.deleted = true
  await review.save()

  return review
}

export const getReviewsById = async (id) => {
  const data = await Reviews.findOne({
    where: {
      deleted: false,
      id
    }
  })
  return data
}

