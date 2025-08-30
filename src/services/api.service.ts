/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import sampleResponse from '@/data/sample-response.json';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiService {
  static async getBorrowerPipeline(): Promise<any> {
    await delay(300);
    return sampleResponse.endpoints[0].response;
  }

  static async getBorrowerDetail(id: string): Promise<any> {
    await delay(200);
    return sampleResponse.endpoints[1].response;
  }

  static async requestDocuments(id: string) {
    await delay(500);
    return sampleResponse.endpoints[2].response;
  }

  static async sendToValuer(id: string) {
    await delay(500);
    return sampleResponse.endpoints[3].response;
  }

  static async approveLone(id: string) {
    await delay(500);
    return sampleResponse.endpoints[4].response;
  }

  static async escalate(id: string) {
    await delay(500);
    return sampleResponse.endpoints[5].response;
  }

  static async getBrokerInfo(): Promise<any> {
    await delay(500);
    return sampleResponse.endpoints[6].response;
  }

  static async getOnboardingWorkflow(): Promise<any> {
    await delay(500);
    return sampleResponse.endpoints[7].response;
  }
}