import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
  import ReviewService from "../../utils/Services/ReviewService";
  
  import { imgURL } from "../../utils/Services/UserService";
  
  import { useEffect, useState } from "react";
  
  export function CustomerReviews({ productId }) {
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const res = await ReviewService.getReviewsByProduct(productId);
          setReviews(res.data.data);
        } catch (error) {
          console.log("Error fetching reviews:", error);
        }
      };
  
      fetchReviews();
    }, [productId]);
  
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
                    alt={`${review.user.firstName} ${review.user.lastName}`}
                    withBorder
                  />
                </TimelineIcon>
                <Typography variant="h6" color="blue-gray">
                  {review.user.firstName} {review.user.lastName}
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
        </Timeline>
      </div>
    );
  }
  