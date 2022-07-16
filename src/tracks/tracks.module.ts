import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './repository/tracks.repository';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
})
export class TracksModule {}