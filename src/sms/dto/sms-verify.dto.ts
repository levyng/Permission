import { 
  IsString,
  IsNotEmpty,
  Matches
} from "class-validator";

export class SmsVerifyDto{
  @IsString()
  @IsNotEmpty()
  code: string;
}
export default SmsVerifyDto;