import User from "../entities/User";
import {getConnection} from "typeorm";
import {v4 as uuid} from 'uuid'

const SessionController = {

    create: async (req: any, res: any) => {

        if (!req.body.username) {
            return res.status(400).send({
                errors: {username: 'Required'},
            })
        }

        if (!req.body.password) {
            return res.status(400).send({
                errors: {password: 'Required'},
            })
        }

        try {
            let fetchUserDetails = await getConnection()
                .createQueryBuilder()
                .select()
                .from(User, 'user')
                .where({email: req.body.username, isActive: true})
                .execute()

            if (!fetchUserDetails[0]) {
                return res.status(400).send({
                    errors: {
                        password:
                            'Invalid credentials.',
                    },
                })
            }

            if (fetchUserDetails[0].password != req.body.password) {
                return res.status(400).send({
                    errors: {
                        password:
                            'Incorrect password. Please retry.',
                    }
                })
            }

            const sessionToken = uuid()

            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    sessionToken: sessionToken,
                })
                .where({id: fetchUserDetails[0].id})
                .execute()
            return res.status(200).send({data: {token: sessionToken}})

        } catch (err) {
            return res
                .status(500)
                .send({errors: {server: 'Some error occurred.'}})
        }
    },

    show: (_req: any, res: any) => {
        return res.status(200).send({data: true})
    },

    destroy: async (req: any, res: any) => {

        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                sessionToken: '',
            })
            .where({id: req.body.whoSentTheRequest.id})
            .execute()

        return res.status(200).send({data: true})
    }
}

export default SessionController
