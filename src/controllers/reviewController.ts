import { Request, Response, RequestHandler } from "express";
import { AppDataSource } from "../data-source";
import { Reviews } from "../entity/Books";
import { Books } from "../entity/Reviews";
import Redis from 'ioredis';

const redis = new Redis();
const reviewRepo = AppDataSource.getRepository(Reviews);
const bookRepo = AppDataSource.getRepository(Books);

export const createReview = async (req: Request, res: Response) => {
    try {
        const book = await bookRepo.findOneBy({ id: parseInt(req.params.bookId) });
        if (!book) {
            res.status(404).json({ error: "Book not found." });
            return;
        }
        const review = reviewRepo.create({ ...req.body, book });
        const result = await reviewRepo.save(review);
        await redis.del([`reviews:${req.params.bookId}`])
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to create review." });
    }
};

export const getReviewsForBook = async (req: Request, res: Response) => {
    try {
        const cachedData = await redis.get(`reviews:${req.params.bookId}`);
        if (cachedData) {
            res.json(JSON.parse(cachedData));
            return
        } else {
            const reviews = await reviewRepo.find({
                where: { book: { id: parseInt(req.params.bookId) } },
            });
            await redis.set(`reviews:${req.params.bookId}`, JSON.stringify(reviews), 'EX', 3600); // Cache for 1 hour
            res.json(reviews);
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch reviews." });
    }
};
