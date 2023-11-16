import { Frame } from "types/location";

export const sortSequencesByTimestamp = (sequences: Frame[][]): Frame[][] => {
  const nonEmptySequences = sequences.filter(seq => seq.length > 0);

  const sortedSequences = nonEmptySequences.sort((aGroup, bGroup) => {
    const maxTimestampA = aGroup[0]?.timestamp || 0;
    const maxTimestampB = bGroup[0]?.timestamp || 0;

    return (
      new Date(maxTimestampB).getTime() - new Date(maxTimestampA).getTime()
    );
  });

  return sortedSequences;
};