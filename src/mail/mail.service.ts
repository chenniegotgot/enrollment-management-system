import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/user';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Send verification email
   * 
   * @param user 
   */
  async sendVerificationEmail(user: User) {
    const subject = 'eLearning Account Verification';
    const activationUrl = `${process.env.HOST}/api/v1/signup/${user.accessToken}`;
    const message =  `<p>Hi ${user.firstName},</p>
                   <p>Thanks for signing up to eLearning! Please activate your account by clicking the link below</p>
                   <p><a href="${activationUrl}"><b><u>Activate Account</u><b></a></p><br></br>
                   <p>Best Regards,</p>
                   <p>eLearning Team</p>`;
    
    return this.sendEmail('chenniegotgot@gmail.com', subject, message); //change recipient to user's email: user.email
  }

  /**
   * Send reset password email
   * 
   * @param user 
   */
  async sendResetPasswordEmail(user: User) {
    const subject = 'eLearning Reset Password';
    const resetPassUrl = `${process.env.HOST}/api/v1/password/${user.accessToken}`;
    const message =  `<p>Hi ${user.firstName},</p>
                   <p>You recently requested to reset your password for your eLearning account. Click the link below to reset your password.</p>
                   <p><a href="${resetPassUrl}"><b><u>Reset Password</u><b></a></p>
                   <p>If you did not request a password reset, please ignore this email.</p><br></br>
                   <p>Thanks,</p>
                   <p>eLearning Team</p>`;
    
    return this.sendEmail('chenniegotgot@gmail.com', subject, message); //change recipient to user's email: account.email
  }

  /**
   * Send email
   * 
   * @param recipient 
   * @param subject 
   * @param message 
   */
  sendEmail(recipient: string, subject: string, message: string) {
    return this.mailerService.sendMail({
      to: recipient, 
      subject: subject,
      html: `${message}`
    });
  }
}
