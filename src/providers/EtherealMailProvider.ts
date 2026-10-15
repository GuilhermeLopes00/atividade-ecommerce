import nodemailer from 'nodemailer'
import logger from '../lib/logger'
import { IMailProvider, MailMessage } from './IMailProvider'

export class EtherealMailProvider implements IMailProvider {
    private transporter: nodemailer.Transporter | null = null

    private async getMailClient(): Promise<nodemailer.Transporter> {
        if (this.transporter) return this.transporter

        const testAccount = await nodemailer.createTestAccount()

        this.transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        })

        logger.info(`Ethereal Mail configurado: ${testAccount.user}`)
        return this.transporter
    }

    async sendMail(message: MailMessage): Promise<string | false> {
        const mailer = await this.getMailClient()
        const info = await mailer.sendMail(message)

        const previewUrl = nodemailer.getTestMessageUrl(info)
        logger.info(`Email enviado: ${previewUrl}`)
        return previewUrl
    }
}
