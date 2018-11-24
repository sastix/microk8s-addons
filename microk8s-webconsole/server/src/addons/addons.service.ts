import { Injectable } from '@nestjs/common';
import { Addon } from '../../../common/models/addon.interface';

@Injectable()
export class AddonsService {
  getAll(): Addon[] {
    const test: Addon = {enabled: true, name: 'TestAddon'};
    return [test];
  }
}
