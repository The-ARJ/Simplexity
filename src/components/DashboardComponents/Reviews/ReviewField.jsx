import {
  Textarea,
  IconButton,
  Typography,
  Rating,
} from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/outline";
import ReviewService from "../../../utils/Services/ReviewService";
import { useContext, useState } from "react";
import { UserContext } from "@/utils/Context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "@/utils/Redux/ReviewSlice";
export function ReviewField({ productId, boughtByUserIds }) {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [reviewText, setReviewText] = useState("");
  const [message, setErrorMessage] = useState("");
  const [rated, setRated] = useState(5);

  const dispatch = useDispatch();

  const handleReviewSubmit = async () => {
    try {
      if (!reviewText || reviewText.trim() === "") {
        setErrorMessage("Please write a review before submitting.");
        return;
      }

      if (user && user.isVerified && boughtByUserIds.includes(user._id)) {
        const reviewData = {
          text: reviewText,
          rating: rated,
          product: productId,
          user: user,
        };

        const response = await ReviewService.createReview(reviewData);
        setReviewText("");
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
    <div className="">
      <Typography color="deep-orange">{message}</Typography>

      <div className="flex w-full flex-row items-center gap-2 rounded-xl border border-blue-gray-500/20  p-2">
        <div className="flex">
          <IconButton variant="text" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </IconButton>
          <IconButton variant="text" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </IconButton>
        </div>
        <Textarea
          rows={1}
          resize={true}
          required
          placeholder="Write Feedback"
          className="min-h-full !border-0 focus:border-transparent"
          containerProps={{
            className: "grid h-full",
          }}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div>
          <IconButton
            onClick={handleReviewSubmit}
            variant="text"
            className="rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </IconButton>
        </div>
        <Rating value={5} onChange={(value) => setRated(value)} />
      </div>
    </div>
  );
}
