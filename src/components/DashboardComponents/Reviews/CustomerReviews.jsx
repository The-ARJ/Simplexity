import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Avatar,
  Badge,
  IconButton,
  Rating,
} from "@material-tailwind/react";
import ReviewService from "../../../utils/Services/ReviewService";
import { imgURL } from "../../../utils/Services/UserService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "@/utils/Redux/ReviewSlice";
import { CheckIcon } from "@heroicons/react/24/outline";

export function CustomerReviews({ productId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const [averageRating, setAverageRating] = useState(0);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await ReviewService.getReviewsByProduct(productId);
        if (res.status === 200) {
          dispatch(updateReview(res.data.data));
        }
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [dispatch, productId]);

  useEffect(() => {
    // Calculate average rating
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      setAverageRating(totalRating / reviews.length);
    } else {
      // If there are no reviews, set the average rating to 0
      setAverageRating(0);
    }
  }, [reviews]);
  let avgRating = Math.round(averageRating);
  console.log(avgRating);
  return (
    <div className=" ">
      {reviews.length > 0 ? (
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-4 flex gap-2 items-center"
          >
            Average Rating:{" "}
            {averageRating > 0 ? (
              <>
                <Rating
                  value={Math.round(averageRating)}
                  readonly
                  className=" "
                />{" "}
                ({averageRating.toFixed(1)})
              </>
            ) : (
              "N/A"
            )}
          </Typography>
        </div>
      ) : (
        <Typography variant="h6" color="blue-gray" className="mb-4">
          No reviews yet.
        </Typography>
      )}
      {reviews.map((review, index) => (
        <TimelineItem key={index}>
          <TimelineHeader className=" flex  justify-between">
            <div className=" ">
              <div className="flex items-center gap-2 justify-end">
                <Avatar
                  size="md"
                  src={`${imgURL}/${review.user.image} `}
                  alt={`${review.user.firstName}`}
                  withBorder
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className=" flex flex-col"
                >
                  <div className=" flex items-center gap-2 justify-between ">
                    {review.user.firstName} {review.user.lastName}{" "}
                    {review.user.isVerified && (
                      <IconButton
                        color="green"
                        className="rounded-full h-3 w-3 "
                      >
                        <CheckIcon className=" h-2" />
                      </IconButton>
                    )}
                  </div>

                  <Rating value={review.rating} readonly className=" " />
                </Typography>
              </div>
            </div>
            <Typography className=" text-xs">
              {new Date(review.createdAt).toLocaleString()}
            </Typography>
          </TimelineHeader>

          <TimelineBody className="pb-4">
            <Typography
              color="gray"
              className="font-normal text-gray-600 text-sm"
            >
              {review.text}
            </Typography>
          </TimelineBody>
        </TimelineItem>
      ))}
    </div>
  );
}
