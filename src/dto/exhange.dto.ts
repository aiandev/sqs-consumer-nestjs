import { IsCurrency, IsEmail, IsNotEmpty } from 'class-validator';

/**
 * @ignore
 */
export class ExchangeDTO {

    @IsNotEmpty()
    readonly from: string; // TODO: validate isCurrency code 

    @IsNotEmpty()
    readonly to: string; // TODO: validate isCurrency code

    @IsNotEmpty()
    @IsCurrency()
    readonly amount: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}