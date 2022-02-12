import { Request, Response } from 'express'
import { Admin } from '@models/Admin'

export default {
  async getAll (req: Request<{}, {}, {}>, res: Response) {
    try {
      const admins = await Admin.find({})
      if (!admins) {
        return res.status(404).json('Any Admin Found!')
      }
      return res.status(200).json(admins)
    } catch (error) {
      return res.status(400).json('Error to find Admins')
    }
  },

  async getById (req: Request<{adminId: string}, {}, {}>, res: Response) {
    const { adminId } = req.params
    try {
      const admins = await Admin.findOne({ _id: adminId })
      if (!admins) {
        return res.status(404).json('Any Admin Found!')
      }
      return res.status(200).json(admins)
    } catch (error) {
      return res.status(400).json('Error to find Admins')
    }
  },

  async store (req: Request<{ adminId: string }, {}, {
    name: string, email: string, password: string
  }>, res: Response) {
    // const { adminId } = req.params
    const { email } = req.body
    try {
      if (await Admin.findOne({ email })) {
        return res.status(404).send(
          { error: 'Email already exists in DataBase' }
        )
      }
      const admin = await Admin.create(req.body)
      admin.password = 'undefined'
      return res.status(200).json(admin)
    } catch (error) {
      return res.status(400).json('Error to create admin')
    }
  },

  async update (req: Request<{ adminId: string }, {}, {
    name: string, email: string, password: string, admin: boolean
  }>, res: Response) {
    const { adminId } = req.params
    const { name, email, password, admin } = req.body
    try {
      const find = await Admin.findOne({ _id: adminId })
      if (!find) {
        return res.status(404).json({ msg: 'Admin doenst exist' })
      }
      const administrator = await Admin.updateOne(
        { _id: adminId },
        req.body
      )
      const bringAdm = await Admin.findOne({ _id: adminId })
      return res.status(200).json(bringAdm)
    } catch (error) {
      return res.status(400).json('Error to update admin')
    }
  }

}
