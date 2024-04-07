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

type MessageData = {
  message_id: string;
  user_id: string;
  owner: string;
  encrypted: boolean;
  contact: string;
  timestamp: string;
  content: string;
  sim: string;
};

export type PayloadHttpSms = {
  specversion: string;
  id: string;
  source: string;
  type: string;
  datacontenttype: string;
  time: string;
  data: MessageData;
};

export type Tx = {
  from: string;
  to: string;
  value: string;
  timestamp: string;
};

export type Action = "Fund" | "Transfer" | "History" | "Withdraw" | null;
