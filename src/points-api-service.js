import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url:'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const responce = await this._load({
      url:`point/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify,
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(responce);
    return parsedResponse;
  }
}
