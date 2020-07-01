import { Controller, Post, Res, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ExchangeDTO } from './dto/exhange.dto';
import { SquissService } from './services/squiss.service';

@Controller()
export class AppController {

  constructor(private readonly squissService: SquissService) {}
  
    /**
     * **POST**
     * @param {object} res
     * @param {class} ExchangeDTO
    */
    @Post('/exchange')
    async exchange(
        @Res() res,
        @Body() exchangeDTO: ExchangeDTO) 
    {
      
      try {
        
        await this.squissService.squiss.sendMessage({
          name: 'exchange',
          message: {
            exchangeDTO
          },
        });

        return res.status(HttpStatus.CREATED).json({
          statusCode: HttpStatus.CREATED,
          message: "Your request in progress"
        });

      } catch (error) {
        const errorMessage = process.env.debug ?  error.toString() : 'Internal error please try again'
        throw new HttpException( errorMessage , HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
