import settings from './settings';

export default class Api {
  constructor() {
    this.headers = settings.headers;
    this.fixtures = settings.fixtures;
  }

  search = async (key, type) => {
    const response = await fetch(`https://api.infermedica.com/v2/search?phrase=${key}` +
      `&sex=male&age=30&max_results=5&type=${type}`, {
      method: 'GET',
      headers: this.headers
    });

    return await response.json();
  }

  getRiskFactors() {

  }

  doDiagnosis = async (evidence) => {
    const response = await fetch(`https://api.infermedica.com/v2/diagnosis`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        "sex": "male",
        "age": 30,
        "evidence": evidence
      })
    });

    return await response.json();
  }

  getDoctors = async () => {
    const response = await fetch(`https://top.md/api/doctors?onPage=2&orderBy=rating&specialty_id=60&city_id=1&include=firstapp%2Cdoctor%3Afrom(2019-05-26)%3Adays(7)`);
    return await response.json();
  }
}