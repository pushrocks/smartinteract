import * as plugins from './smartinteract.plugins';
import { IAnswerObject } from './smartinteract.classes.smartinteract';

/**
 * class AnswerBucket holds answers
 */
export class AnswerBucket {
  answerMap = new plugins.lik.Objectmap<IAnswerObject>();

  /**
   * add an answer to the bucket
   */
  addAnswer(answerArg: IAnswerObject) {
    this.answerMap.add(answerArg);
  }

  /**
   * gets an answer for a specific name
   */
  getAnswerFor(nameArg: string) {
    let answer = this.answerMap.find(answerArg => {
      return answerArg.name === nameArg;
    });
    return answer ? answer.value : null;
  }

  /**
   * gets all answers as array
   */
  getAllAnswers() {
    return this.answerMap.getArray();
  }
}
