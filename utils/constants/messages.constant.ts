export const getCreatedAccountMsg = (walletAddress: string) => {
  return `We're thrilled to welcome you to BongoCash! 🥳 Congratulations! Your new wallet address on the side chain is: ${walletAddress}.

    To get you started, we've credited your account with a complimentary faucet of **10 XRP tokens**.
`;
};

export const getHelpMsg = () => {
  return (
    "🌟 Here are the actions you can perform 🌟:\n\n" +
    "1️⃣ Fund Your Account 💰\n" +
    "To add money WXRP Ledger Usd to your account, simply send a message followed by your unique code.\n" +
    "2️⃣ Transfer Funds 🔄\n" +
    "Want to send money to someone? Send a message which includes the amount and the recipient's phone number.\n" +
    "3️⃣ View Transaction History 📜\n" +
    "Curious about your past transactions? Consult them quickly, no additional information needed!\n" +
    "4️⃣ Withdraw 🎁\n" +
    "Withdraw cash by redeeming some WXRP Ledger Usd.\n"
  );
};

export const getReceivedFfundMsg = (amount: string, phoneNumber: string) => {
  return `You received ${amount} tokens from ${phoneNumber}.`;
};

export const getSentFundMsg = (amount: string, phoneNumber: string) => {
  return `You have sent ${amount} tokens to ${phoneNumber}.`;
};
