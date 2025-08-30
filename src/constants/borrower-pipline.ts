export const BorrowerPipelineTabs = {
  NEW: 'New',
  IN_REVIEW: 'In Review',
  APPROVED: 'Approved'
} as const;

export function getBorrowerPipelineTabs(): string [] {
  return Object.values(BorrowerPipelineTabs);
}