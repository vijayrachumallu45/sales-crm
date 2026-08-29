export interface NPSResponse {
  customerId: string;
  score: number; // 0-10
  feedbackText: string;
  date: string;
}

export class CustomerFeedbackService {
  public static calculateNPS(responses: NPSResponse[]): { npsScore: number; promoters: number; detractors: number } {
    if (!responses || responses.length === 0) {
      return { npsScore: 0, promoters: 0, detractors: 0 };
    }

    const promoters = responses.filter((r) => r.score >= 9).length;
    const detractors = responses.filter((r) => r.score <= 6).length;
    const npsScore = Math.round(((promoters - detractors) / responses.length) * 100);

    return { npsScore, promoters, detractors };
  }
}
