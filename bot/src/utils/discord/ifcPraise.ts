/**
 * this interface represents the schema of a Praise object
 * @praiseTargets is an array of strings representing Discord IDs of the praised ppl
 * @reason a string describing why the target(s) was/were praised
 */
export default interface ifcPraise {
  praiseTargets: string[];
  reason?: string;
}
