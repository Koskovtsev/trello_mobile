interface IBoardLayout {
  itemWidth: number;
  gap: number;
  sidePadding: number;
}

export const getBoardLayout = (screenWidth: number): IBoardLayout => {
  const itemWidth = screenWidth * 0.85;
  const gap = screenWidth * 0.04;
  const sidePadding = (screenWidth - itemWidth) / 2;

  return { itemWidth, gap, sidePadding };
};

export const getSnapOffsets = (length: number, itemWidth: number, gap: number): number[] =>
  Array.from({ length }, (_, index) => index * (itemWidth + gap));
