import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './entities/invoice.entity';
import { Model } from 'mongoose';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<Invoice>,
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const { ...invoiceData } = createInvoiceDto;

      const newInvoice = this.invoiceModel.create({
        ...invoiceData,
      });
      (await newInvoice).save();
      return await newInvoice;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const newInvoiceList = this.invoiceModel.find();
      return await newInvoiceList;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      const invoice = await this.invoiceModel.findById(id);
      if (!invoice) {
        throw new Error(`Invoice ${id} not found`);
      }
      return invoice;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    try {
      const invoiceUpdate = await this.invoiceModel.findByIdAndUpdate(
        id,
        updateInvoiceDto,
        { new: true },
      );
      if (!invoiceUpdate) {
        throw new Error(`Invoice ${id} not found`);
      }
      return invoiceUpdate;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: string) {
    throw new HttpException(
      `#${id}: You can't delete any invoice`,
      HttpStatus.FORBIDDEN,
    );
  }
}
