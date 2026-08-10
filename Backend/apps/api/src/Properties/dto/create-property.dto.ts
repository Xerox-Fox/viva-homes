import { IsString, IsNumber } from 'class-validator';

export class CreatePropertyDto {
    @IsString()
    title!: string;
    @IsString()
    description!: string;

    @IsString()
    listingType!: "sale" | "rent";
    @IsString()
    type!: "house" | "apartment" | "villa";

    @IsNumber()
    price!: number;

    @IsNumber()
    bedrooms!: number;
    @IsNumber()
    bathrooms!: number;
    @IsNumber()
    area!: number;

    @IsString()
    city!: string;
    @IsString()
    subCity!: string;
    @IsString()
    address!: string;

    @IsNumber()
    longitude!: number;
    @IsNumber()
    latitude!: number;
}