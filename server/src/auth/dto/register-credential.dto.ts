import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class RegisterCredentialDto {
  @IsString({ message: 'Username must be a string' })
  username: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  // // At least one lowercase letter (a-z).
  // // At least one uppercase letter (A-Z).
  // // At least one digit (0-9).
  // // The password must be at least 8 characters long.
  // //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[a-zA-Z\d@#$%^&+=!]{8,}$/ ---- this includes for special sign
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
  //   message: 'Password is too weak',
  // })
  password: string;
}
