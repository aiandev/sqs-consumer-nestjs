import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ExchangeDTO } from './dto/exhange.dto';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}
  
    /**
     * **POST**
     * @param {object} res
     * @param {class} ExchangeDTO
    */
    @Post('/exchange')
    async exchange(
        @Res() res,
        @Body() ExchangeDTO: ExchangeDTO,
    ) {
      try {
        const insertedInSQS = await this.appService.sendConversion(ExchangeDTO);
        return res.status(HttpStatus.CREATED).json([
          insertedInSQS
        ]);
      } catch (error) {
        // handle it better Middleware
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json([
          error
        ]);
      }
    }
}
