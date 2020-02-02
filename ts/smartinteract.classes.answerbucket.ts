import * as plugins from './smartinteract.plugins';
import { IAnswerObject } from './smartinteract.classes.smartinteract';

/**
 * class AnswerBucket holds answers
 */
export class AnswerBucket {
  private answerMap = new plugins.lik.Objectmap<IAnswerObject>();

  /**
   * add an answer to the bucket
   */
  public addAnswer(answerArg: IAnswerObject) {
    this.answerMap.add(answerArg);
  }

  /**
   * gets an answer for a specific name
   */
  public getAnswerFor(nameArg: string) {
    const answer = this.answerMap.find(answerArg => {
      return answerArg.name === nameArg;
    });
    return answer ? answer.value : null;
  }

  /**
   * gets all answers as array
   */
  public getAllAnswers() {
    return this.answerMap.getArray();
  }
}
