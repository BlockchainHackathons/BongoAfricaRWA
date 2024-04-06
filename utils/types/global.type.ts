export type EncryptedData = {
  iv: string;
  encryptedData: string;
};

export type WalletDetails = { walletAddress: string; privateKey: string };

export type User = {
  phoneNumber: string;
  walletAddress: string;
  encryptedData: EncryptedData;
};

export type UserSql = {
  id: number;
  walletaddress: string;
  iv: string;
  encrypteddata: string;
  phonenumber: string;
};
