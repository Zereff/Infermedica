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
    const responseDiagnosis = await fetch(`https://api.infermedica.com/v2/diagnosis`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        "sex": "male",
        "age": 30,
        "evidence": evidence
      })
    });

    return await responseDiagnosis.json();
  }
}