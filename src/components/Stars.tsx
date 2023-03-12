interface IReviewStarsProps {
  averageRating: number;
}

const ReviewStars: React.FC<IReviewStarsProps> = ({ averageRating }) => {
  const allStars = [...Array(5)];

  return (
    <div className={`w-17 h-[14px] flex`}>
      {allStars.map((index) => {
        const fill = Math.min(1, Math.max(0, averageRating - index)) * 100;
        const starStyle = `absolute h-[14px] w-[14px] top-0 left-0 right-0`;

        return (
          <div
            className={`mr-1 relative h-[14px] w-[14px] last:mr-0`}
            key={index}
          >
            <div className={`${starStyle} star`} />
            <div
              style={{ width: `${fill}%` }}
              className={`${starStyle} star-full`}
            />
          </div>
        );
      })}
      <style jsx>{`
        .star {
          background: url("/icons/empty-star.svg");
        }
        .star-full {
          background: url("/icons/full-star.svg");
        }
      `}</style>
    </div>
  );
};

export default ReviewStars;
