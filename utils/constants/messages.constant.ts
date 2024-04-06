export const getCreatedAccountMsg = (
  walletAddress: string,
  phoneNumber: string
) => {
  return `
    We're thrilled to welcome you to BongoCash! Your account has been successfully created, and you're all set to embark on this exciting journey with us.

    **Account Details:**

    - **Wallet Address:** ${walletAddress}
    - **Phone Number:** ${phoneNumber}

    To get you started, we've credited your account with a complimentary faucet of **10 XRP tokens**. These tokens are available in your wallet and ready for use.

    Should you have any questions or require assistance as you explore our platform, please don't hesitate to reach out to our support team.

    Thank you for choosing BongoCash. We're excited to have you on board and look forward to supporting your journey with us.

    Warm regards,

    The Bongo Team`;
};
