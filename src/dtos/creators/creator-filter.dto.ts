export class CreatorFilterDto {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  fullName?: string;
  modified?: Date;
  resourceURI?: string;
  urls?: string[];
  thumbnail?: string;
  series?: string[];
  stories?: { name: string; type: string }[];
  comics?: string[];
  events?: string[];
}
