// import * as amqp from "amqplib";
import { Repository } from "typeorm";
import { Thread } from "../entities/thread";
import { AppDataSource } from "../data-source";
import { EventEmitter } from "stream";
import cloudinary from "../utils/Cloudinary";

export default new (class ThreadWorker {
	private readonly ThreadRepository: Repository<Thread> =
		AppDataSource.getRepository(Thread);
	private emitter = new EventEmitter();

	async create(queueName: string, connection: any) {
        try {
          const channel = await connection.createChannel();
          await channel.assertQueue(queueName);
          await channel.consume(queueName, async (message: any) => {
            try {
              if (message !== null) {
                const payload = JSON.parse(message.content.toString());
                
                const cloudinaryResponse = payload.image
                  ? await cloudinary.destination(payload.image) // Perubahan disini
                  : null;
    
                const thread = this.ThreadRepository.create({
                  content: payload.content,
                  image: cloudinaryResponse,
                  user: {
                    id: payload.users,
                  },
                });
    
                await this.ThreadRepository.save(thread);
    
                this.emitter.emit("message");
                console.log("(Worker) : Thread is created");
    
                channel.ack(message);
              }
            } catch (error) {
              console.log("(Worker) : Thread creation failed");
            }
          });
        } catch (error) {
          console.log("(Worker) : Error while consuming the thread queue");
        }
      }
})();
