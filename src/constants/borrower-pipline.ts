export const BorrowerPipelineTabs = {
  new: 'New',
  in_review: 'In Review',
  approved: 'Approved'
} as const;

export function getBorrowerPipelineTabs(): string[] {
  return Object.values(BorrowerPipelineTabs);
}

export function getBorrowerPipelineTabsKeyFromValue(
  value: string
): string | undefined {
  return Object.keys(BorrowerPipelineTabs)
    .find(key => 
      BorrowerPipelineTabs[key as keyof typeof BorrowerPipelineTabs] === value);
}