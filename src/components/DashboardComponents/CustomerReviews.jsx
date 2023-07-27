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
} from "@material-tailwind/react";
import ReviewService from "../../utils/Services/ReviewService";
import { imgURL } from "../../utils/Services/UserService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "@/utils/Redux/ReviewSlice";
import { CheckIcon } from "@heroicons/react/24/outline";

export function CustomerReviews({ productId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  console.log(reviews);
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

  return (
    <div className="w-[32rem]">
      <Timeline>
        {reviews.map((review, index) => (
          <TimelineItem key={index}>
            <TimelineConnector />
            <TimelineHeader>
              <TimelineIcon className="p-0">
                <Avatar
                  size="sm"
                  src={`${imgURL}/${review.user.image} `}
                  alt={`${review.user.firstName}`}
                  withBorder
                />
              </TimelineIcon>

              <div className="">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className=" flex items-center gap-2"
                >
                  {review.user.firstName} {review.user.lastName}{" "}
                  {review.user.isVerified && (
                    <IconButton color="green" className="rounded-full h-3 w-3 ">
                      <CheckIcon className=" h-2" />
                    </IconButton>
                  )}
                </Typography>

                <Typography className=" text-xs">
                  {new Date(review.createdAt).toLocaleString()}
                </Typography>
              </div>
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
      </Timeline>
    </div>
  );
}
