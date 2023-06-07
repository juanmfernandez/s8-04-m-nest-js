import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './entities/invoice.entity';
import mongoose, { Model } from 'mongoose';
import { resolve } from 'path';
import { Company } from 'src/companies/entities/company.entity';
import { log } from 'console';
const PDFDocument = require('pdfkit-table');

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<Invoice>,
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const { ...invoiceData } = createInvoiceDto;

      const newInvoice = this.invoiceModel.create({
        ...invoiceData,
      });
      (await newInvoice).company = new mongoose.Types.ObjectId(
        invoiceData.company.toString(),
      );
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

  async findByCompany(id: string){
    try {
      const newInvoiceList = await this.invoiceModel.find()
        .where('company').equals(new mongoose.Types.ObjectId(id.toString()))
      if (!newInvoiceList) {
        throw new Error(`Any invoice was found for company ${id}`);
      }
      return newInvoiceList;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOneAndConvertToPdf(id: string): Promise<Buffer> {
    try {
      const invoice = await this.invoiceModel.findById(id);
      if (!invoice) {
        throw new Error(`Any invoice was found for id ${id}`);
      }
      if (!invoice.company) {
        throw new Error(`No Company for this invoice`);
      }
      const company = await this.companyModel.findById(invoice.company);

      const invoicePdfBuffer: Buffer = await new Promise((resolve) => {
        const doc = new PDFDocument({
          size: 'A4',
          buferPages: true,
        });
        const invoiceDates = {
          headers: ['', ''],
          rows: [
            ['ID', invoice.id],
            ['Emision', invoice.issueDate.toLocaleString()],
            ['Vencimiento', invoice.dueDate.toLocaleString()],
          ],
        };
        const invoiceTotal = {
          headers: ['', ''],
          rows: [['TOTAL FACTURA', invoice.amount]],
        };
        const invoiceToData = {
          title: {
            label: `Factura`,
            fontSize: 24,
            color: 'blue',
            fontFamily: 'Helvetica-Bold',
          },
          subtitle: {
            label: `${invoice.supplier}`,
            fontSize: 16,
            color: 'black',
            fontFamily: 'Helvetica-Bold',
          },
          headers: ['', ''],
          rows: [
            ['Señores', company.razonSocial],
            ['CUIT', company.rutEmpresa],
            ['Teléfono', company.contact],
            ['Direccion', company.address],
          ],
        };

        const invoiceTable = {
          headers: ['Cantidad', 'Descipcion', 'Precio'],
          rows: [['1', invoice.detail, invoice.amount]],
        };

        doc.table(invoiceToData, {
          hideHeader: true,
          prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            doc.font('Helvetica').fontSize(12);
            indexColumn === 0 && doc.addBackground(rectRow, 'grey', 0.15);
          },
          columnsSize: [110, 140],
        });

        doc.table(invoiceDates, {
          hideHeader: true,
          prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            doc.font('Helvetica').fontSize(11);
            indexColumn === 0 && doc.addBackground(rectRow, 'grey', 0.15);
          },
          columnsSize: [75, 150],
        });

        doc.table(invoiceTable, {
          prepareHeader: () => doc.font('Helvetica-Bold').fontSize(16),
          prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            doc.font('Helvetica').fontSize(14);
            indexColumn === 0 && doc.addBackground(rectRow, 'green', 0.2);
          },
          columnsSize: [150, 190, 150],
        });
        doc.moveDown(4);
        doc.table(invoiceTotal, {
          hideHeader: true,
          width: 400,
          x: 190,
          divider: {
            header: { disabled: true },
            horizontal: { disabled: true },
          },
          prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            doc.font('Helvetica').fontSize(24);
          },
          columnsSize: [290, 230],
        });

        const buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', () => {
          const data = Buffer.concat(buffer);
          resolve(data);
        });
        doc.end();
      });
      return invoicePdfBuffer;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
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
