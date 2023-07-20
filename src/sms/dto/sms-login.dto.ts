import { 
  IsString,
  IsNotEmpty,
  Matches
} from "class-validator";

export class SmsLoginDto{
  @IsString()
  @IsNotEmpty()
  // @Matches(/^\+[1-9]\d{1,14}$/)
  phoneNumber: string;

}
export default SmsLoginDto;