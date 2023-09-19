import {
  Textarea,
  Typography,
  Rating,
} from "@/components/MaterialComponents/Material-Tailwind";
import ReviewService from "../../../utils/Services/ReviewService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "@/utils/Redux/ReviewSlice";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export function ReviewField({ productId, boughtByUserIds }) {
  const { user } = useSelector((state) => state.user);
  const [reviewText, setReviewText] = useState("");
  const [message, setErrorMessage] = useState("");
  const [rated, setRated] = useState(null);

  const dispatch = useDispatch();
  const handleReviewSubmit = async () => {
    try {
      if (!user) {
        setErrorMessage("Please Login to give a review.");
        return;
      }
      if (!reviewText || reviewText.trim() === "") {
        setErrorMessage("Please write a review before submitting.");
        return;
      }
      if (!rated || rated < 1) {
        setErrorMessage(
          "Please select an appropriate rating before submitting."
        );
        return;
      }

      if (user && user.isVerified && boughtByUserIds.includes(user.id)) {
        const reviewData = {
          text: reviewText,
          rating: rated,
          product: productId,
          user: user,
        };
        const token = user.token;

        const response = await ReviewService.createReview(reviewData, token);
        setReviewText("");
        setErrorMessage("");
        dispatch(addReview(reviewData));
      } else if (user && !user.isVerified) {
        setErrorMessage("Please verify your account to give a review.");
      } else {
        setErrorMessage("Please buy the product to give a review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMessage("Error submitting review. Please try again later.");
    }
  };

  return (
    <div className="w-full">
      <Typography color="deep-orange">{message}</Typography>

      <div className="flex  w-full sm:flex-row items-center gap-2 rounded-xl border border-blue-gray-500/20 p-2">
        <div className="flex flex-col w-full sm:flex-row items-center gap-2 rounded-xl ">
          <Textarea
            rows={1}
            resize={true}
            required
            placeholder="Write Feedback"
            className="min-h-full !border-0 focus:border-transparent w-full sm:w-auto flex-grow mb-2 sm:mb-0"
            containerProps={{
              className: "grid h-full",
            }}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="w-full sm:w-auto">
            <Rating value={0} onChange={(value) => setRated(value)} />
          </div>
        </div>
        <div className="flex flex-row sm:gap-2">
          <PaperAirplaneIcon
            onClick={handleReviewSubmit}
            variant="text"
            className={`rounded-full h-5 w-5 ${
              !rated || rated < 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
