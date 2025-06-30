import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Books } from "../entity/Books";
import Redis from 'ioredis';

const redis = new Redis();
const bookRepo = AppDataSource.getRepository(Books);

export const createBook = async (req: Request, res: Response) => {
    try {
        const book = bookRepo.create(req.body);
        const result = await bookRepo.save(book);
        await redis.del(['books'])
        res.status(201).json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Failed to create book." });
    }
};

export const getAllBooks = async (_req: Request, res: Response) => {
    try {
        const books = await bookRepo.find({ relations: ["reviews"] });
        const cachedData = await redis.get('books');

        if (cachedData) {
            res.json(JSON.parse(cachedData));
            return
        } else {
            await redis.set('books', JSON.stringify(books), 'EX', 3600); // Cache for 1 hour
        }
        res.json(books);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Failed to fetch books." });
    }
};
