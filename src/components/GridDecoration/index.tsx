interface GridDecorationProps {
  rotation?: 0 | 90 | 180 | 270;
  pattern?: number[][];
  colors?: string[];
  cellSize?: number;
}

export default function GridDecoration({
  rotation = 0,
  pattern = [
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 1],
  ],
  colors = ['#DCE8E9', '#D9D8D7'],
  cellSize = 24,
}: GridDecorationProps) {
  return (
    <div
      className="inline-block"
      style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center', zIndex: -1 }}
    >
      {pattern.map((row, rIdx) => (
        <div key={rIdx} className="flex">
          {row.map((cell, cIdx) =>
            cell ? (
              <div
                key={cIdx}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: colors[(rIdx + cIdx) % colors.length],
                }}
              />
            ) : (
              <div
                key={cIdx}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: 'transparent',
                }}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}
