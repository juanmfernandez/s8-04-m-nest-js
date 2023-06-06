import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiOkResponse, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Invoice } from './entities/invoice.entity';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @ApiResponse({
    status: 201,
    description: 'Invoice was created',
    type: Invoice,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (Invoice bad data)',
  })
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Get(':id/pdf')
  @ApiProduces('application/pdf')
  @ApiOkResponse({ description: 'PDF file named ${id}.pdf' })
  async getInvoicePdf(@Param('id') id: string, @Res() res): Promise<void> {
    const pdf = await this.invoicesService.findOneAndConvertToPdf(id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${id}.pdf`,
      'Content-Length': pdf.length
    })
    res.end(pdf)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @ApiResponse({
    status: 403,
    description: `#{id} You can't delete any invoice`,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
