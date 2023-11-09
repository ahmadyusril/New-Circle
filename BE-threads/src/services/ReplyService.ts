import { Repository } from "typeorm";
import { Reply } from "../entities/reply";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createReplySchema, updateReplySchema } from "../utils/validator/Reply";
import { v2 as cloudinary } from "cloudinary";
import { deleteFile } from "../utils/FileHelper";
// import { uploadToCloudinary } from "../utils/Cloudinary";

export default new class ReplyServices {
    private readonly ReplyRepository: Repository<Reply> =
        AppDataSource.getRepository(Reply);
    
    async create(req: Request, res: Response) : Promise<Response> {
        try {
            const data = req.body;

            const { error, value } = createReplySchema.validate(data);
            if (error) {
                console.log(error);
                
                return res.status(400).json({ error })
            };
            console.log(value);
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            })

            let image = ""
            if (res.locals.filename) {
                // save to cloudinary
                image = res.locals.filename;
                const cloudinaryResponse = await cloudinary.uploader.upload(
                   `src/uploads/${image}`,
                    { folder: "threads", }
                );
                image = cloudinaryResponse.secure_url
                // delete file from local server after save to cloudinary
                deleteFile(req.file.path);
            }
            // let image = ""
            // if (req.file?.filename) {
            //     // save to cloudinary
            //     image = await uploadToCloudinary(req.file);
            //     // delete file from local server after save to cloudinary
            //     deleteFile(req.file.path);
            // }
            
            const reply = await this.ReplyRepository.create({
                thread: value.thread_id,
                user: res.locals.loginSession.user.id,
                content: value.content,
                image: image
            });

            const createReply = await this.ReplyRepository.save(reply);       
            return res.status(201).json(createReply);        
        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: "error while creating reply" })
        }
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const replies = await this.ReplyRepository.find({
                relations: {
                    thread: true,
                    user: true
                },
                select: {
                    thread: {
                        id: true,
                        content: true,
                    },
                    user: {
                        id: true,
                        full_name: true,
                        email: true,
                    },
                },
            });
            return res.status(200).json({data: replies});
        }   catch (error) {
            console.log(error);
            
            return res.status(500).json({ message: "error while find replies", error: error });
        }
    }

    async findById(req: Request, res: Response) : Promise<Response> {
        try {
            const id = Number(req.params.id);
            const reply = await this.ReplyRepository.findOne({
                where: { id:id },
                relations: ["thread", "user"],
                select: {
                    thread: { 
                        id: true, 
                        content: true
                     },
                    user: { 
                        id: true, 
                        full_name: true, 
                        email: true
                     },
                },
            });
            return res.status(200).json(reply);
        }   catch (error) {
            return res.status(500).json ({ error: "error while find reply" })
        }
    }

    async update(req: Request, res: Response) : Promise<Response> {
        try {
            const id = Number(req.params.id);
            const image = res.locals.filename;
            const reply = await this.ReplyRepository.findOne({
                where: { id:id },
                relations: {
                    thread: true,
                    user: true
                }
            });
            if (!reply) {
                return res.status(404).send("Reply not found");
            }

            const data = req.body;
            const { error, value } = updateReplySchema.validate(data);
            if (error) {
                console.log(error);
                
                return res.status(400).json({ error: error.details[0].message });
            }

            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });

            const cloudinaryResponse = await cloudinary.uploader.upload(
                `src/uploads/${image}`, { folder: "threads" }
            );
            console.log("cloudinary response", cloudinaryResponse);

            deleteFile(req.file.path);

            reply.content = value.content;
            reply.image = value.image;
            
            const updateReply = await this.ReplyRepository.save(reply);
            return res.status(201).json(updateReply)
        }   catch (error) {
            return res.status(500).json({ error: "Error while update reply" })
        }
    }

    async delete(req: Request, res: Response) : Promise<Response> {
        try {
            const id = Number(req.params.id);
            const reply = await this.ReplyRepository.findOne ({ 
                where: { id:id },
                relations: ["thread", "user"],
             });
            if (!reply) {
                return res.status(404).send("Reply not found");
            }   else {
                const deleteReply = await this.ReplyRepository.remove(reply);
                return res.status(200).send({
                    Thread: deleteReply,
                    message: "Thread deleted"
                });
            }
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error while delete thread" })
        }
    }   
}