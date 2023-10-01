export interface IFormCreateCampaign {
  site: string,
  name: string,
  description: string,
  active: false,
  ruleName: string,
  ruleOperator: string,
  ruleValue: string
}
export interface IRule{
  name: string,
  operator: string,
  value: string
}

export interface ICreateCampaignParams {
  site: string,
  name: string,
  description: string,
  active: false,
  rule: IRule
}