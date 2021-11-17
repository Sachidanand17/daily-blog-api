import {getConnection} from "typeorm";
import User from "../entities/User";
import {v4 as uuid} from "uuid";

const UserController = {
    create: async (req: any, res: any) => {

        const sessionToken = uuid()

        try {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    sessionToken: sessionToken
                })
                .returning('id')
                .execute()
            return res.status(200).send({data: {token: sessionToken}})
        } catch (err) {
            return res.status(400).send(err)
        }
    }
}

export default UserController