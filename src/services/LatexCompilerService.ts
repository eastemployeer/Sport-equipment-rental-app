import axios from 'axios';
import fs from 'fs';

import { PATH_LATEX_COMPILER } from '@/paths';

export interface CompilePDFRequest {
  file: string;
  'file-name': string;
}

export interface CompilePDFResponse {
  compiledPDF: string;
}

export class LatexCompilerService {
  public static async compilePDF(data: Blob): Promise<CompilePDFResponse> {
    const formdata = new FormData();
    let res;

    formdata.append('file', data);
    formdata.append('file-name', 'compiledPDF');

    try {
      res = await axios.post(`${PATH_LATEX_COMPILER}/compile-pdf`, formdata);
    } catch (error) {
      console.log('error', error.response);
    }

    const response: CompilePDFResponse = {
      compiledPDF: res?.data,
    };

    return response;
  }
}
