import { IsString, IsNumber } from 'class-validator';

export class CreatePropertyDto {
    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsString()
    location!: string;

    @IsNumber()
    price!: number;
}