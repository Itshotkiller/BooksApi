import { Router } from "express";
import {
    createReview,
    getReviewsForBook
} from "../controllers/reviewController";

const router = Router({ mergeParams: true });

// List or create reviews for a book
router.route("/books/:bookId/reviews")
    .get(getReviewsForBook)
    .post(createReview);

export default router;
