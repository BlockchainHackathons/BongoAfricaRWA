import { supabase } from "../clients/supabase.client";
import { User, UserSql } from "../types/global.type";

export const insertNewUser = async (newUser: User) => {
  const { error } = await supabase.from("users").insert({
    walletaddress: newUser.walletAddress,
    iv: newUser.encryptedData.iv,
    encrypteddata: newUser.encryptedData.encryptedData,
    phonenumber: newUser.phoneNumber,
  });
};

export const getUser = async (phoneNumber: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("phonenumber", phoneNumber);

  if (data === null || data.length === 0) {
    return null;
  }

  const user: UserSql = data[0];

  return {
    phoneNumber: user.phonenumber,
    walletAddress: user.walletaddress,
    encryptedData: {
      encryptedData: user.encrypteddata,
      iv: user.iv,
    },
  };
};
export const getUserFromWallet = async (
  walletaddress: string
): Promise<User | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("walletaddress", walletaddress);

  if (data === null || data.length === 0) {
    return null;
  }

  const user: UserSql = data[0];

  return {
    phoneNumber: user.phonenumber,
    walletAddress: user.walletaddress,
    encryptedData: {
      encryptedData: user.encrypteddata,
      iv: user.iv,
    },
  };
};
