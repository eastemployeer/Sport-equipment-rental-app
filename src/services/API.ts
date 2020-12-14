import Axios from 'axios';

interface Options {
  query?: any;
  body?: any;
}

class API {
  private method: 'get' | 'post';

  private url: string;

  private options: Options;

  constructor(method: 'get' | 'post', url: string, options: Options) {
    this.method = method;
    this.url = url;
    this.options = options;
  }

  public async call(getStatus = false) {
    const config = {
      method: this.method,
      url: `http://localhost:3000/${this.url}?${new URLSearchParams(this.options.query)}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: this.options.body,
    };

    const response = await Axios(config);

    if (getStatus) return { data: response.data, status: response.status };

    return response.data;
  }
}

export default API;
