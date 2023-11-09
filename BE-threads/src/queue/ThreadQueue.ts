import { Request, Response } from "express";
import MessageQueue from "../libs/rabbitmq";
import { createThreadSchema } from "../utils/validator/Thread";

type QueuePayload = {
	content: string;
	image: string;
	user: number;
};

export default new (class ThreadQueue {
	async create(req: Request, res: Response) {
		try {
			const loginSession: any = res.locals.loginSession;

			const data = {
				content: req.body.content, 
				image: res.locals.filename 
			};

			// console.log(data.image);
			// console.log(data.content);

			const { error, value } = createThreadSchema.validate(data);
			if (error) return res.status(400).json({ error });

			// IF CONTENT AND IMAGE NULL IS WRONG
			if (!value.content && !value.image)
				return res
					.status(400)
					.json({ Error: "Data Image/Content Dont Be Null" });

			if (!value.image) value.image ? value.image : null
			if (!value.content) value.content ? value.content : null
			const payload: QueuePayload = {
				content: value.content,
				image: value.image,
				user: loginSession.user.id,
			};

			const errorQueue = await MessageQueue.MessageSend(
				process.env.THREAD,
				payload
			);
			if (errorQueue)
				return res
					.status(500)
					.json({ message: "something error while sending message queue" });

			return res.status(201).json({
				message: "Thread is queued !",
				payload,
			});
		} catch (err) {
			// console.log(err);

			return res.status(500).json({ message: "error in threadqueue method" });
		}
	}
})();

// import { Request, Response } from "express";
// import MessageQueue from "../libs/rabbitmq";
// import { createThreadSchema } from "../utils/validator/Thread";

// type QueuePayload = {
// 	content: string;
// 	image: string;
// 	user: number;
// };

// export default new class ThreadQueue {
// 	async create(req: Request, res: Response) {
// 		try {
// 			const loginSession: any = res.locals.loginSession;

// 			const data = {
// 				content: req.body.content ? req.body.content : null,
// 				image: res.locals.filename ? req.body.filename : null,
// 			};

// 			const { error, value } = createThreadSchema.validate(data);
// 			if (error) return res.status(400).json({ error });

// 			const payload: QueuePayload = {
// 				content: value.content,
// 				image: value.image,
// 				user: loginSession.users.id,
// 			};

// 			const errorQueue = await MessageQueue.MessageSend(
// 				process.env.THREAD,
// 				payload
// 			);
// 			if (errorQueue)
// 				return res
// 					.status(500)
// 					.json({ message: "something error while sending message queue" });

// 			return res.status(201).json({
// 				message: "Thread is queued !",
// 				payload,
// 			});
// 		} catch (err) {
// 			return res.status(500).json({ message: "error in threadqueue method" });
// 		}
// 	}
// };
