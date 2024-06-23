import { Module } from '@nestjs/common';
import { SaveNewCircuitAction } from './actions/save-new-circuit.action';
import { CircuitController } from './circuit.controller';
import { UserModule } from '../user/user.module';
import { CircuitService } from './circuit.service';
import { DataCircuitModule } from 'src/app/data-access';
import { GetUserCircuitsAction } from './actions/get-user-circuits.action';
import { GetCircuitAction } from './actions/get-circuit.action';
import { DeleteCircuitAction } from './actions/delete.action';

@Module({
  controllers: [CircuitController],
  providers: [
    SaveNewCircuitAction,
    CircuitService,
    GetUserCircuitsAction,
    GetCircuitAction,
    DeleteCircuitAction,
  ],
  imports: [UserModule, DataCircuitModule],
})
export class CircuitModule {}
