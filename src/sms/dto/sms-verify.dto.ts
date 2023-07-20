import { 
  IsString,
  IsNotEmpty,
  Matches
} from "class-validator";

export class SmsVerifyDto{
  @IsString()
  @IsNotEmpty()
  // @Matches(/^\+[1-9]\d{1,14}$/)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
export default SmsVerifyDto;