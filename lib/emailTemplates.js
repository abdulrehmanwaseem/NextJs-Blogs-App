export const sendTwoFactorTokenEmailTemplate = (token) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #ffffff;">
        <h2 style="color: #333333;">Two-Factor Authentication Code</h2>
        <p>Your 2FA code is:</p>
        <h1 style="color: #007BFF;">${token}</h1>
        <p style="color: #555555;">Please use this code to complete your login process. The code is valid for 10 minutes.</p>
        <p style="color: #999999; font-size: 12px;">If you did not request this code, please ignore this email.</p>
      </div>
    </div>
  `;
};

export const sendPasswordResetEmailTemplate = (resetLink) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #ffffff;">
        <h2 style="color: #333333;">Password Reset Request</h2>
        <p>We received a request to reset your password. Click the link below to reset your password:</p>
        <p><a href="${resetLink}" style="color: #007BFF; text-decoration: none;">Reset Password</a></p>
        <p style="color: #555555;">If you did not request a password reset, please ignore this email.</p>
        <p style="color: #999999; font-size: 12px;">This link will expire in 1 hour.</p>
      </div>
    </div>
  `;
};

export const sendVerificationEmailTemplate = (confirmLink) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #ffffff;">
        <h2 style="color: #333333;">Email Verification</h2>
        <p>Thank you for signing up! Please verify your email address by clicking the link below:</p>
        <p><a href="${confirmLink}" style="color: #007BFF; text-decoration: none;">Verify Email</a></p>
        <p style="color: #555555;">If you did not sign up for this account, please ignore this email.</p>
        <p style="color: #999999; font-size: 12px;">This link will expire in 1 hour.</p>
      </div>
    </div>
  `;
};

export const sendContactUsEmailTemplate = (subject) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #ffffff;">
        <h2 style="color: #333333;">Thank You for Contacting Us</h2>
        <p>We have received your message regarding:</p>
        <h3 style="color: #007BFF;">${subject}</h3>
        <p style="color: #555555;">Our team is currently reviewing your message and will get back to you as soon as possible. Thank you for your patience.</p>
        <p style="color: #999999; font-size: 12px;">If you did not send this message, please ignore this email.</p>
      </div>
    </div>
  `;
};
