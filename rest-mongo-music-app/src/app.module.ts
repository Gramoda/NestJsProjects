import {Module} from "@nestjs/common";
import { TrackModule } from "./tracks/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import * as path from 'path'
import {ServeStaticModule} from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import { MongooseConfigService } from "./config/MongooseConfigService.ts";
import configuration from "./config/configuration";


@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useClass: MongooseConfigService,
        }),
        ConfigModule.forRoot({
          load: [configuration],
        }),
        TrackModule,
        FileModule
    ]
})
export class AppModule {}