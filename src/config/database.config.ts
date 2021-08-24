import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";
​
@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
​
  createTypeOrmOptions() {
    return this.configService.get('database');
  }
}
