import axios, { AxiosError } from "axios";
import { Response } from "../../types/types";

type Prams = {
  resetPasswordToken: string;
};

export async function VerifyUserByResetPassToken({
  params,
}: any): Promise<AxiosError | Response> {
  console.log(params);

  const user = await axios.get<AxiosError, Response>(
    `http://localhost:3000/user/getUserByResetPassword/${params.resetPasswordToken}`
  );
  return user;
}
