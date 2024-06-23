import { Module } from '@nestjs/common';
import { DataCircuitService } from './data-circuit.service';

@Module({
  providers: [DataCircuitService],
  exports: [DataCircuitService],
})
export class DataCircuitModule {}
