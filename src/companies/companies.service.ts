import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const { ...companyData } = createCompanyDto;

      const company = this.companyModel.create({
        ...companyData,
      });
      //employee example
      (await company).employees.push(
        new mongoose.Types.ObjectId('646a77be7c086a8a4b7d8b07'.toString()),
      );
      (await company).save();
      return await company;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const companies = await this.companyModel.find();
      return companies;
    } catch (error) {
      throw new HttpException(`Companies wasn't found`, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      const company = await this.companyModel.findOne({ _id: id });
      return company;
    } catch (error) {
      throw new HttpException(`Company ${id} found`, HttpStatus.NOT_FOUND);
    }
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
