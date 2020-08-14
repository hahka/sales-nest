import { PipeTransform, Injectable, ValidationPipe } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe
  implements PipeTransform<any> {
  constructor(groups: string[]) {
    super({
      transform: true,
      // whitelist: true and forbidNonWhitelisted: true tells ValidationPipe to throw errors
      // when non-whitelisted are present instead of having mongo throw useless error messages
      whitelist: true,
      forbidNonWhitelisted: true,
      groups,
    });
  }
}
