import Axios from 'axios';

interface Options {
  query?: any;
  body?: any;
}

class API {
  private method: 'get' | 'post' | 'delete';

  private url: string;

  private options: Options;

  constructor(method: 'get' | 'post' | 'delete', url: string, options: Options) {
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

    let response;

    try {
      response = await Axios(config);
    } catch (error) {
      return { status: error.response.status };
    }

    if (getStatus) return { data: response.data, status: response.status };

    return response.data;
  }
}

export default API;
