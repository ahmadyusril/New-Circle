import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { EventEmitter } from "stream";
import { Thread } from "../entities/thread";
import * as ampq from "amqplib";
import { uploadToCloudinary } from "../utils/Cloudinary";

export default new class ThreadWorker {
    private readonly ThreadRepository: Repository<Thread> =
        AppDataSource.getRepository(Thread)
    private emitter: new EventEmitter();

    async create(queueName: string, connection: ampq.connection) {
        try {
            const channel = await connection.createChannel();
            await channel.assertQueue(queueName);
            await channel.consume(queueName, async (message) => {
                if (message !== null) {
                    const payload = JSON.parse(message.content.toString());
                    console.log(payload);
                }
                const cloudinaryResponse = await uploadToCloudinary.destination(payload.image)
                const thread = this.ThreadRepository.create({
                    content: payload.content,
                    image: cloudinaryResponse.image,
                    user: {
                        id: payload.user
                    }
                })

            })
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify({})));
        } catch (error) {
            console.log(error);

        }
    }
}