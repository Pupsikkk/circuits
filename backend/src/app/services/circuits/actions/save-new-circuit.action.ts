import { BaseAction } from 'src/app/core/interfaces';
import { SaveNewCircuitInboundDto } from '../dto';
import { CircuitService } from '../circuit.service';
import { User } from 'src/app/core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SaveNewCircuitAction
  implements BaseAction<[User, SaveNewCircuitInboundDto], any>
{
  constructor(private readonly circuitService: CircuitService) {}

  async run(owner: User, dto: SaveNewCircuitInboundDto) {
    console.log(dto);

    const savedCircuit = await this.circuitService.saveNewCircuit({
      user: owner,
      ...dto,
    });

    return savedCircuit;
  }
}
