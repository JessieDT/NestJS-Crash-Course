import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength } from "class-validator";

// dto: data transfer obejct
export class CreateUserDto {
    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(10)
    name: string;

    // @ApiProperty({ required: false })
    // age?: number;
}